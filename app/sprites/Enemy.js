/*
Generic enemy class that extends Phaser sprites.
Classes for enemy types extend this class.
*/

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);    
    config.scene.matter.add.gameObject(this);
    config.scene.add.existing(this);
    this.enemy = true;
    this.alive = true;
    // start still and wait until needed
    this.setVelocity(0, 0);
    this.beenSeen = false;
    // know about Player
    this.player = this.scene.player; 
    // Base horizontal velocity / direction.
    this.direction = -50; 
    this.setFixedRotation(true);
    this.setScale(.25);
    this.setFrictionAir(0.05);
    this.setMass(30);
  }

  activated(){
    // Method to check if an enemy is activated, the enemy will stay put
    // until activated so that starting positions is correct
    if(!this.alive){
      if(this.y>240){
        this.kill();
      }
      return false;
    }
    if(!this.beenSeen){
      // check if it's being seen now and if so, activate it
      if(this.x<this.scene.cameras.main.scrollX+this.scene.sys.game.canvas.width+80){
        this.beenSeen = true;
        return true;
      }
      return false;
    }
    return true;
  }

  collision(whoHitMe) {
    this.death();
  }

  death() {
    this.scene.matter.world.remove(this);
    this.destroy();
  }
}
