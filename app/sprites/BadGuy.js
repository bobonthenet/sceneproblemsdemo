import Enemy from './Enemy';
import Bullet from './Bullet';

export default class BadGuy extends Enemy {
  constructor (config) {
    super(config);
    this.lastFired = 0;
    this.setIgnoreGravity(true);
    this.bullets = this.scene.add.group();
    let bullet;
    for(let i=0;i<10;i++) {
      bullet = new Bullet({
        scene: this.scene,
        key: 'bullet',
        x: 0,
        y: 0
      });
      this.bullets.add(bullet);
    }
  }

  update () {
    if (!this.activated()){return;}
    let time = this.scene.time.now;

    this.bullets.children.entries.forEach(
      (bullet) => {bullet.update();}
    );

    if (time > this.lastFired) {
      let bullet = this.bullets.get();

      if (bullet)
      {
        bullet.fire(this.x, this.y, -25, 0, -90, 0);
        this.lastFired = time + 2000;
      }
    }

    //rudimentary AI
    if(this.scene.player.active) {
      if(this.scene.player.y > this.y) {
        this.setVelocityY(1);
      } else {
        this.setVelocityY(-1);
      }
    }
    this.setVelocityX(-2);
  }
}