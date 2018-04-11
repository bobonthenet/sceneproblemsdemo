export default class Boot extends Phaser.Scene {

  constructor () {
    super('boot');
    this.progressBar = null;
    this.progressBarRectangle = null;
  }

  preload () {
    this.load.image('sky', 'space3.png');
    this.load.image('logo', 'phaser3-logo.png');
    this.load.image('red', 'red.png');
    this.load.on('progress', this.onLoadProgress, this);
    this.load.on('complete', this.onLoadComplete, this);
    this.load.json('levels', 'levels.json');
    this.load.image('bullet', 'bullet.png');
    this.load.image('badguy', 'badguy.png');
    this.load.image('player', 'player.png');
    this.load.image('tiles', 'tiles_spritesheet.png');
    this.createProgressBar();
  }

  create () {
    this.scene.start('menu');
  }

  // extend:

  createProgressBar () {
    var main = this.cameras.main;
    this.progressBarRectangle = new Phaser.Geom.Rectangle(0, 0, 0.5 * main.width, 50);
    Phaser.Geom.Rectangle.CenterOn(this.progressBarRectangle, 0.5 * main.width, 0.5 * main.height);
    this.progressBar = this.add.graphics();
  }

  onLoadComplete (loader) {
    console.log('onLoadComplete', loader);
    this.progressBar.destroy();
  }

  onLoadProgress (progress) {
    var rect = this.progressBarRectangle;
    var color = (this.load.failed.size > 0) ? (0xff2200) : (0xffffff);
    this.progressBar
      .clear()
      .fillStyle(0x222222)
      .fillRect(rect.x, rect.y, rect.width, rect.height)
      .fillStyle(color)
      .fillRect(rect.x, rect.y, progress * rect.width, rect.height);
    console.log('progress', progress);
  }

}
