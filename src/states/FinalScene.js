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

      this.mapManager = new MapManager(this.map, Levels[`Level666`].lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      const originPositionBadGuy = Width + 300;
      const originPositionBaby = Width + 300;
      const originHeroPosition = - 100;

      this.hero = this.game.add.sprite(originHeroPosition, 405, HeroSprite.key);
      this.baby = this.game.add.sprite(originPositionBaby, 420, 'baby');
      this.baby2 = this.game.add.sprite(originPositionBaby + 50, 420, 'baby2');
      this.badGuy = this.game.add.sprite(originPositionBadGuy, 405, 'baby3');

      this.baby.scale.setTo(-BabyRatio, BabyRatio);
      this.baby2.scale.setTo(-BabyRatio, BabyRatio);
      this.badGuy.scale.setTo(-HeroRatio, HeroRatio);
      this.hero.scale.setTo(HeroRatio, HeroRatio);

      console.log(this.hero.anchor)
      this.baby.anchor.setTo(0.5, 0.5);
      this.baby2.anchor.setTo(0.5, 0.5);
      this.badGuy.anchor.setTo(0.5, 0.5);
      this.hero.anchor.setTo(0.5, 0.5);

      const timer = 4000;

      let tweenA = this.game.add.tween(this.hero).to( { x: 200 }, timer, "Quart.easeOut");
      let tweenB = this.game.add.tween(this.badGuy).to( { x: 900 }, 2000, "Quart.easeOut");
      let tweenC = this.game.add.tween(this.baby).to( { x: 900 - 30 }, timer, "Quart.easeOut");
      let tweenD = this.game.add.tween(this.baby2).to( { x: 900 + 30 }, timer, "Quart.easeOut");

      this.tweenE = this.game.add.tween(this.baby).to( { x: originHeroPosition }, timer, "Quart.easeOut");
      this.tweenF = this.game.add.tween(this.baby2).to( { x: originHeroPosition }, timer, "Quart.easeOut");

      this.tweenG = this.game.add.tween(this.hero).to( { x: originHeroPosition }, timer * 1.5, "Quart.easeOut");
      this.tweenJ = this.game.add.tween(this.badGuy).to( { x: originPositionBadGuy }, timer * 1.5, "Quart.easeOut");

      tweenD.onComplete.add(this.catched, this);

      tweenA.start();
      tweenB.start();
      tweenC.start();
      tweenD.start();

      this.tweensGems = []
      this.gemSprite = [];
      const items = ["gem", "gem2", "gem3"];
      for(let i = 0; i < 25; ++i) {
        let sprite = this.game.add.sprite(200 , 400, items[Math.floor(Math.random()*items.length)]);
        sprite.visible = false;
        this.gemSprite.push(sprite);
        const tween = this.game.add.tween(sprite).to( { x: 900 }, timer - (200 * 25 / i), "Quart.easeOut");
        this.tweensGems.push(tween);
      }
  }

  catched() {
    this.tweenE.start();
    this.tweenF.start();
    this.tweensGems.forEach(tween => tween.start());
    this.gemSprite.forEach(sprite => sprite.visible = true);
    this.tweenF.onComplete.add(() => {
      this.tweenG.start();
      this.tweenJ.start();
      this.gemSprite.forEach(sprite => sprite.visible = false);
      //flips
      this.badGuy.scale.setTo(HeroRatio, HeroRatio);
      this.hero.scale.setTo(-HeroRatio, HeroRatio);
    }, this);

     this.tweenJ.onComplete.add(() => {
        this.game.goToMenu();
     });
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level666`].key, `res/${Levels[`Level666`].path}` , null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("baby", "res/baby.png");
    this.game.load.image("baby2", "res/baby2.png");
    this.game.load.image("baby3", "res/baby3.png");
    this.game.load.image("gem", "res/gem.png");
    this.game.load.image("gem2", "res/gem2.png");
    this.game.load.image("gem3", "res/gem3.png");
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
