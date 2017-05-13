import { WidthSpriteSheetHero, HeightSpriteSheetHero, Width, Height, BabyRatio, HeroRatio } from '../Constants.js';
import { Tileset, Levels, HeroSprite } from '../ConstantsKey.js';
import MapManager from "objects/MapManager";
import Character from 'objects/Character';

class Introduction extends Phaser.State {

  constructor() {
    super();
  }

  create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap(Levels[`Level6`].key);
      this.map.addTilesetImage(Levels[`Level6`].key, Tileset.key);

      this.map.createLayer('thirdLayer');
      this.map.createLayer('secondLayer');
      this.map.createLayer('firstLayer');
      // This resizes the game world to match the layer dimensions
      this.collisionLayer = this.map.createLayer('colissionLayer');
      this.map.setCollisionByExclusion([], true, this.collisionLayer);

      this.collisionLayer.resizeWorld();

      this.mapManager = new MapManager(this.map, Levels[`Level6`].lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      this.baby = this.game.add.sprite(400, 395, 'baby');
      this.baby2 = this.game.add.sprite(350, 395, 'baby2');
      this.badGuy = this.game.add.sprite(950, 370, 'baby3');
      this.baby.scale.setTo(BabyRatio, BabyRatio);
      this.baby2.scale.setTo(BabyRatio, BabyRatio);
      this.badGuy.scale.setTo(HeroRatio, HeroRatio);

      let tweenA = this.game.add.tween(this.badGuy).to( { y: 320 }, 2000, "Quart.easeOut");
      let tweenB = this.game.add.tween(this.badGuy).to( { x: 370 }, 1000, "Quart.easeOut");
      this.tweenC = this.game.add.tween(this.badGuy).to( { x: -320 }, 1000, "Quart.easeOut");
      this.tweenD = this.game.add.tween(this.baby).to( { x: -350 + 50 }, 1000, "Quart.easeOut");
      this.tweenE = this.game.add.tween(this.baby2).to( { x: -350 }, 1000, "Quart.easeOut");

      this.tweenF = this.game.add.tween(this.badGuy).to( { x: -350 }, 1000, "Quart.easeOut");
      this.tweenG = this.game.add.tween(this.baby).to( { x: -350 }, 1000, "Quart.easeOut");
      this.tweenH = this.game.add.tween(this.baby2).to( { x: 400 }, 1000, "Quart.easeOut");
      this.tweenI = this.game.add.tween(this.baby).to( { x: 400 }, 1000, "Quart.easeOut");

      tweenA.chain(tweenB);
      tweenB.chain(this.tweenC);
      tweenB.onComplete.add(this.catched, this);

      tweenA.start();
  }

  catched() {
    this.tweenC.start();
    this.tweenD.start();
    this.tweenE.start();

    this.tweenE.onComplete.add(() => {
      this.mapManager.removeLayer();
      this.badGuy.x = 970;
      this.baby.x = 990;
      this.baby2.x = 950;

      this.tweenF.start();
      this.tweenG.start();
      this.tweenH.start();
    }, this);

    this.tweenH.onComplete.add(() => {
      this.mapManager.removeLayer();
      this.badGuy.x = 970;
      this.baby.x = 990;

      this.baby2.kill();

      this.tweenF.start();
      this.tweenI.start();
    }, this);
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level6`].key, `res/${Levels[`Level6`].path}` , null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("baby", "res/baby.png");
    this.game.load.image("baby2", "res/baby2.png");
    this.game.load.image("baby3", "res/baby3.png");
  }

  render() {
    //this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
  }


}

export default Introduction;
