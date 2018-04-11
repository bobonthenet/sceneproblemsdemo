import Bullet from '../sprites/Bullet';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.matter.add.gameObject(this);
    config.scene.add.existing(this);
    this.setIgnoreGravity(true);
    this.setFixedRotation(true);
    this.setScale(.25);
    this.setFrictionAir(0.05);
    this.setMass(30);
    this.lastFired = 0;

    this.bullets = this.scene.add.group();
    let bullet;
    for(let i=0;i<20;i++) {
      bullet = new Bullet({
        scene: this.scene,
        key: 'bullet',
        x: 0,
        y: 0
      });
      this.bullets.add(bullet);
    }
  }

  update() {
    if (!this.active) {return;}
    this.bullets.children.entries.forEach(
      (bullet) => {bullet.update();}
    );

    //I feel like there must be a better way to do this.
    if(this.angle !== 0){
      this.setAngle(0);
    }
    
    let time = this.scene.time.now;
    let keys = this.scene.keys;
    let input = {
      left: keys.left.isDown,
      right: keys.right.isDown,
      down: keys.down.isDown,
      up: keys.up.isDown,
      space: keys.space.isDown
    };

    if (this.active) {
      if (input.left) {
        this.thrustBack(0.1);
      } else if (input.right) {
        this.thrust(0.1);
      }
      if (input.up) {
        this.thrustLeft(0.1);
      } else if (input.down) {
        this.thrustRight(0.1);
      }

      if (input.space && time > this.lastFired) {
        let bullet = this.bullets.get();
        if (bullet)
        {
          bullet.fire(this.x, this.y, 25, 0, 90, 0);
          this.lastFired = time + 500;
        }
      }
    }
  }

  collision(whoHitMe) {
    this.death();
  }

  death(whoKilledMe) {
    this.scene.matter.world.remove(this);
    this.scene.time.delayedCall(3000, function(){
      location.reload(); 
    }, [], this.scene);
    this.destroy();
  }
}