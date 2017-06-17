import { WidthSpriteSheetHero, HeightSpriteSheetHero, Width, Height, BabyRatio, HeroRatio } from '../Constants.js';
import { Tileset, Levels, HeroSprite } from '../ConstantsKey.js';
import MapManager from "objects/MapManager";
import Character from 'objects/Character';

const originPositionBadGuy = 200;
const originPositionBaby = 900;

class Introduction extends Phaser.State {

  constructor() {
    super();
  }

  create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap(Levels[`Level666`].key);
      this.map.addTilesetImage(Levels[`Level666`].key, Tileset.key);

      this.map.createLayer('thirdLayer');
      this.map.createLayer('secondLayer');
      this.map.createLayer('firstLayer');
      // This resizes the game world to match the layer dimensions
      this.collisionLayer = this.map.createLayer('colissionLayer');
      this.map.setCollisionByExclusion([], true, this.collisionLayer);

      this.collisionLayer.resizeWorld();

      this.mapManager = new MapManager(this.map, Levels[`Level6`].lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      const originPositionBadGuy = 200;
      const originPositionBaby = 900;

      this.baby = this.add.group();
      this.baby.create(originPositionBaby, 800, 'baby');

      this.baby2 = this.add.group();
      this.baby2.create(originPositionBaby + 50, 800, 'baby2');

      this.badGuy = this.game.add.sprite(originPositionBadGuy, 370, 'baby3');

      this.baby.scale.setTo(BabyRatio, BabyRatio);
      this.baby2.scale.setTo(BabyRatio, BabyRatio);
      this.badGuy.scale.setTo(HeroRatio, HeroRatio);
      const timer = 2000;

      let tweenA = this.game.add.tween(this.badGuy).to( { y: 370 }, 2000, "Quart.easeOut");
      let tweenB = this.game.add.tween(this.badGuy).to( { x: 920 / 2 }, timer, "Quart.easeOut");
      this.tweenF = this.game.add.tween(this.badGuy).to( { x: 920 }, timer, "Quart.easeOut");
      this.tweenC = this.game.add.tween(this.badGuy).to( { x: Width + 600 }, timer + 2000 , "Quart.easeOut");
      this.tweenD = this.game.add.tween(this.baby).to( { x: Width + 100 }, timer + 2000, "Quart.easeOut");
      this.tweenE = this.game.add.tween(this.baby2).to( { x: Width + 10 }, timer + 2000, "Quart.easeOut");

      tweenA.chain(tweenB);
      tweenB.chain(this.tweenC);
      tweenB.onComplete.add(this.catched, this);

      tweenA.start();
  }

  catched() {
    this.tweenF.start();
    this.tweenC.start();
    this.tweenD.start();
    this.tweenE.start();

    this.baby.create(originPositionBaby, 800, 'cage');
    this.baby2.create(originPositionBaby + 50, 800, 'cage');

    this.nbReboot = 0;

    this.tweenE.onComplete.add(() => {
      if(this.nbReboot > 1) {
        this.game.goToMainGame();
        return;
      }
      this.camera.fade(0x000000, 300, false);
      this.game.camera.onFadeComplete.addOnce(this.resetFade([this.tweenC, this.tweenD, this.tweenE]), this);
      this.mapManager.removeLayer();
      this.badGuy.x = 150;
      this.baby.x = -350;
      this.baby2.x = -400;
      this.nbReboot += 1;
    }, this);

  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level666`].key, `res/${Levels[`Level666`].path}` , null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("baby", "res/baby.png");
    this.game.load.image("baby2", "res/baby2.png");
    this.game.load.image("baby3", "res/baby3.png");
    this.game.load.image("cage", "res/cage.png");
  }

  resetFade(TweensArray) {
    return() => {
      this.game.camera.resetFX();
      TweensArray.forEach(tween => {
        tween.start();
      });
    }
  }

}

export default Introduction;
