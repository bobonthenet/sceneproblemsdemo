import BadGuy from '../sprites/BadGuy';
import Player from '../sprites/Player';

export default class Bob extends Phaser.Scene {

  constructor () {
    super('bob');

  }

  init (data) {
    // data.level = 'level2';
    if(data.level) {
      this.level = this.cache.json.get('levels')[data.level];
    } else {
      this.level = this.cache.json.get('levels')['level1'];
    }
  }

  preload() {
    this.load.tilemapTiledJSON('map', `${this.level}.json`);
  }

  create () {
    this.time.delayedCall(5000, function(){
      this.scene.start('bob', {level: 'level2'});
    }, [], this);

    this.map = this.make.tilemap({ key: 'map'});
    this.tileset = this.map.addTilesetImage('tiles_spritesheet', 'tiles');
    this.collisionLayer = this.map.createDynamicLayer('collision', this.tileset, 0, 0);
    this.collisionLayer.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(this.collisionLayer);
    this.matter.world.setBounds(this.map.widthInPixels, this.map.heightInPixels);

    this.enemyGroup = this.add.group();

    this.map.getObjectLayer('enemies').objects.forEach(
      (enemy) => {
        let enemyObject;
        switch (enemy.name) {
        case 'badguy':
          enemyObject = new BadGuy({
            scene: this,
            key: 'badguy',
            x: enemy.x,
            y: enemy.y
          });
          break;
        default:
          console.error('Unknown:', this.tileset.tileProperties[enemy.gid - 1]);
          break;
        }
        this.enemyGroup.add(enemyObject);
      }
    );

    this.player = new Player({
      scene: this,
      key: 'player',
      x: 300,
      y: 300
    });

    this.cameras.main.setBounds();

    this.matter.world.on('collisionstart', function(event, bodyA, bodyB) {
      if(bodyA.gameObject.collision) {
        bodyA.gameObject.collision(bodyB.gameObject);
      }
      if(bodyB.gameObject.collision) {
        bodyB.gameObject.collision(bodyA.gameObject);
      }
    }, this);

    this.keys = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    };
  }

  update () {
    this.player.update();
    this.enemyGroup.children.entries.forEach(
      (sprite) => {sprite.update();}
    );
    this.cameras.main.scrollX += 2;
  }
}
