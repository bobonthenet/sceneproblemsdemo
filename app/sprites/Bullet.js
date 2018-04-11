export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.add.existing(this);
    this.setActive(false);
    this.setVisible(false);
  }

  fire(x, y, velocityX, velocityY, offsetX, offsetY) {
    this.scene.matter.add.gameObject(this);
    this.setIgnoreGravity(true);
    this.setPosition(x + offsetX, y + offsetY);
    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);
    this.setActive(true);
    this.setVisible(true);
  }

  update() {
    if (this.active) {
      if (this.x > this.scene.cameras.main.scrollX + this.scene.cameras.main.width)
      {
        this.death();
      }
    }  
  }

  collision() {
    this.death();
  }

  death() {
    this.scene.matter.world.remove(this);
    this.setPosition(0, 0);
    this.setVelocityX(0);
    this.setActive(false);
    this.setVisible(false);
  }
}