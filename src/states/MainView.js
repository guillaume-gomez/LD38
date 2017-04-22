import { WidthSpriteSheetHero, HeightSpriteSheetHero } from '../Constants.js';
import { Tileset, Level1, HeroSpriteKey } from '../ConstantsKey.js';
import Character from 'objects/Character';
import { loadColissionMap } from "../platformerUtils.js";

//TO DESTROY LATER
const MaxLayer = 2

class MainView extends Phaser.State {

  constructor() {
    super();
  }

  init() {
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // Add the physics engine to all game objects
    this.game.world.enableBody = true;

    this.map = this.game.add.tilemap(Level1.key);
    this.map.addTilesetImage(Level1.key, Tileset.key);
    this.map.createLayer('firstLayer');
    this.map.createLayer('secondLayer');
    this.map.createLayer('thirdLayer');

    this.collisionLayer = this.map.createLayer('colissionLayer');
    this.map.setCollisionByExclusion([], true, this.collisionLayer);
    // This resizes the game world to match the layer dimensions
    this.collisionLayer.resizeWorld();

    this.hero = new Character(this.game, 20 , 300, HeroSpriteKey, 0);
    this.game.add.existing(this.hero);
    this.game.camera.follow(this.hero);

    this.keyRemoveLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.keyRemoveLayer.onDown.add(this.eraseBlock, this);
    //this.game.time.advancedTiming = true;
  }


  update() {
    this.game.physics.arcade.collide(this.hero, this.collisionLayer);
  }

  findLayerToDestroy(x, y, lengthX, lengthY) {
    let layerIndex = 0;
    for(let index = 0; index < 2; index++) {
      if(this.map.getTile(x, y, index) === null &&
         this.map.getTile(x + lengthX-1, y + lengthY-1, index) === null) {
        layerIndex++;
      } else {
        break;
      }
    }
    console.log(layerIndex)
    return layerIndex;
  }

  eraseBlock() {
    const x = 0;
    const y = 0;
    const lengthY = 10;
    const lengthX = 10;
    //check the layers associated to the deletion;
    const layerIndex = this.findLayerToDestroy(x, y, lengthX, lengthY);
    for(let xAxis = x; xAxis < lengthX; xAxis++) {
      for(let yAxis = y; yAxis < lengthY; yAxis++) {
        this.map.removeTile(xAxis, yAxis, layerIndex);
      }
    }
  }

  preload() {
    this.game.load.spritesheet(HeroSpriteKey, "res/hero.png", WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Level1.key, `res/${Level1.path}` , null, Phaser.Tilemap.TILED_JSON);
  }

   //render() {
     //this.game.debug.spriteInfo(this.hero, 32, 400);
     //this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
   //}

}

export default MainView;
