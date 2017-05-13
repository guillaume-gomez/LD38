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

      this.map = this.game.add.tilemap(Levels[`Level1`].key);
      this.map.addTilesetImage(Levels[`Level1`].key, Tileset.key);

      this.map.createLayer('thirdLayer');
      this.map.createLayer('secondLayer');
      this.map.createLayer('firstLayer');
      // This resizes the game world to match the layer dimensions
      this.collisionLayer = this.map.createLayer('colissionLayer');
      this.map.setCollisionByExclusion([], true, this.collisionLayer);

      this.collisionLayer.resizeWorld();

      this.mapManager = new MapManager(this.map, Levels[`Level1`].lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      let baby = this.game.add.sprite(400, 395, 'baby');
      let baby2 = this.game.add.sprite(350, 395, 'baby2');
      let baby3 = this.game.add.sprite(950, 370, 'baby3');
      baby.scale.setTo(BabyRatio, BabyRatio);
      baby2.scale.setTo(BabyRatio, BabyRatio);
      baby3.scale.setTo(HeroRatio, HeroRatio);


  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level1`].key, `res/${Levels[`Level1`].path}` , null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("baby", "res/baby.png");
    this.game.load.image("baby2", "res/baby2.png");
    this.game.load.image("baby3", "res/baby3.png");
  }

  render() {
    //this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
  }


}

export default Introduction;
