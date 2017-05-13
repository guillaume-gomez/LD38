import { WidthSpriteSheetHero, HeightSpriteSheetHero, Width, Height } from '../Constants.js';
import { Tileset, Level1, HeroSprite } from '../ConstantsKey.js';
import Character from 'objects/Character';

class Introduction extends Phaser.State {

  constructor() {
    super();
  }

  create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // Add the physics engine to all game objects
      this.game.world.enableBody = true;

      this.map = this.game.add.tilemap("level1");
      this.map.addTilesetImage(Levels[`Level${this.indexLevel}`].key, Tileset.key);


      this.map.createLayer('thirdLayer');
      this.map.createLayer('secondLayer');
      this.map.createLayer('firstLayer');
      // This resizes the game world to match the layer dimensions
      this.collisionLayer = this.map.createLayer('colissionLayer');
      this.map.setCollisionByExclusion([], true, this.collisionLayer);

      this.collisionLayer.resizeWorld();

      this.hero = new Character(this.game, Levels[`Level${this.indexLevel}`].playerPosition.x , Levels[`Level${this.indexLevel}`].playerPosition.y, HeroSprite.key, 0);
      this.game.add.existing(this.hero);
      this.game.camera.follow(this.hero);

      this.marker = null;
      this.createTileSelector();
      this.game.input.addMoveCallback(this.updateMarker, this);
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap("level1", "res/level1.json" , null, Phaser.Tilemap.TILED_JSON);
  }

  render() {
    //this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
  }


}

export default Introduction;
