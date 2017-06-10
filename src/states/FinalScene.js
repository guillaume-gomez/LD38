import { WidthSpriteSheetHero, HeightSpriteSheetHero, Width, Height, BabyRatio, HeroRatio } from '../Constants.js';
import { Tileset, Levels, HeroSprite } from '../ConstantsKey.js';
import MapManager from "objects/MapManager";
import Character from 'objects/Character';

class FinalScene extends Phaser.State {

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

      const originPositionBadGuy = Width + 300;
      const originPositionBaby = Width + 300;
      const originHeroPosition = - 100;

      this.hero = this.game.add.sprite(originHeroPosition, 370, HeroSprite.key);
      this.baby = this.game.add.sprite(originPositionBaby, 395, 'baby');
      this.baby2 = this.game.add.sprite(originPositionBaby + 50, 395, 'baby2');
      this.badGuy = this.game.add.sprite(originPositionBadGuy, 370, 'baby3');

      this.baby.scale.setTo(BabyRatio, BabyRatio);
      this.baby2.scale.setTo(BabyRatio, BabyRatio);
      this.badGuy.scale.setTo(HeroRatio, HeroRatio);
      this.hero.scale.setTo(HeroRatio, HeroRatio);
      const timer = 3000;

      let tweenA = this.game.add.tween(this.hero).to( { x: 200 }, timer, "Quart.easeOut");
      let tweenB = this.game.add.tween(this.badGuy).to( { x: 900 }, 2000, "Quart.easeOut");
      let tweenC = this.game.add.tween(this.baby).to( { x: 900 - 30 }, timer, "Quart.easeOut");
      let tweenD = this.game.add.tween(this.baby2).to( { x: 900 + 30 }, timer, "Quart.easeOut");

      this.tweenE = this.game.add.tween(this.baby).to( { x: 200 - 30 }, timer, "Quart.easeOut");
      this.tweenF = this.game.add.tween(this.baby2).to( { x: 200 - 50 }, timer, "Quart.easeOut");

      this.tweenG = this.game.add.tween(this.hero).to( { x: originHeroPosition }, timer, "Quart.easeOut");
      this.tweenH = this.game.add.tween(this.baby).to( { x: originHeroPosition - 30 }, timer, "Quart.easeOut");
      this.tweenI = this.game.add.tween(this.baby2).to( { x: originHeroPosition - 50 }, timer, "Quart.easeOut");
      this.tweenJ = this.game.add.tween(this.badGuy).to( { x: originPositionBadGuy }, timer, "Quart.easeOut");

      tweenD.onComplete.add(this.catched, this);

      tweenA.start();
      tweenB.start();
      tweenC.start();
      tweenD.start();
  }

  catched() {
    this.tweenE.start();
    this.tweenF.start();
    this.tweenF.onComplete.add(() => {
      this.tweenG.start();
      this.tweenH.start();
      this.tweenI.start();
      this.tweenJ.start();
    }, this);

    // this.tweenH.onComplete.add(() => {
    //   this.camera.fade(0x000000, 300, false);
    //   this.game.camera.onFadeComplete.addOnce(this.resetFade([this.tweenF, this.tweenI]), this);
    //   this.mapManager.removeLayer();

    //   this.badGuy.x = 150;
    //   this.baby.x = 130;
    //   this.baby2.kill();

    // }, this);
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level6`].key, `res/${Levels[`Level6`].path}` , null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("baby", "res/baby.png");
    this.game.load.image("baby2", "res/baby2.png");
    this.game.load.image("baby3", "res/baby3.png");
  }

  resetFade(TweensArray) {
    return() => {
      this.game.camera.resetFX();
      TweensArray.forEach(tween => {
        console.log(tween)
        tween.start();
      });
    }
  }

}

export default FinalScene;
