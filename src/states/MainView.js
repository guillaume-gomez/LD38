import { WidthSpriteSheetHero, HeightSpriteSheetHero, Size, CursorSize } from '../Constants.js';
import { Tileset, Level1, HeroSpriteKey } from '../ConstantsKey.js';
import Character from 'objects/Character';
import { loadColissionMap } from "../platformerUtils.js";

import MapManager from "objects/MapManager";

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

    this.marker = null;
    this.createTileSelector();
    this.game.input.addMoveCallback(this.updateMarker, this);

    this.mapManager = new MapManager(this.map, MaxLayer);

    this.keyRemoveLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.keyRemoveLayer.onDown.add(this.eraseBlockKeyboard, this);

    this.keyUndoLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);

    this.game.time.advancedTiming = true;

  }


  update() {
    this.game.physics.arcade.collide(this.hero, this.collisionLayer);
  }

  preload() {
    this.game.load.spritesheet(HeroSpriteKey, "res/hero.png", WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Level1.key, `res/${Level1.path}` , null, Phaser.Tilemap.TILED_JSON);
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
  }

  eraseBlockKeyboard() {
    this.mapManager.eraseBlock(this.marker.x / Size, this.marker.y / Size);
  }

  undoBlockKeyboard() {
    this.mapManager.undoBlock(this.marker.x / Size, this.marker.y / Size);
  }

  updateMarker() {
    this.marker.x = this.game.math.snapToFloor(this.game.input.activePointer.worldX, Size, 0);
    this.marker.y = this.game.math.snapToFloor(this.game.input.activePointer.worldY, Size, 0);

    if (this.game.input.mousePointer.isDown && this.marker.y > Size) {
      this.mapManager.eraseBlock(this.marker.x / Size, this.marker.y / Size);
    }

  }

  createTileSelector() {
    //Our painting marker
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0xFF0000, 1);
    this.marker.drawRect(0, 0, CursorSize, CursorSize);
  }

}

export default MainView;
