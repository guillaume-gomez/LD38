import { WidthSpriteSheetHero, HeightSpriteSheetHero, Size, CursorSize, Width, Height } from '../Constants.js';
import { Tileset, Level1, Levels, HeroSprite } from '../ConstantsKey.js';
import Character from 'objects/Character';
import InformationString from 'objects/InformationString';

import MapManager from "objects/MapManager";

//TO DESTROY LATER
const MaxLayer = 3;

class MainView extends Phaser.State {

  constructor() {
    super();
  }

  init(indexLevel) {
    this.indexLevel = indexLevel || 1;
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // Add the physics engine to all game objects
    this.game.world.enableBody = true;

    this.map = this.game.add.tilemap(Levels[`Level${this.indexLevel}`].key);
    this.map.addTilesetImage(Levels[`Level${this.indexLevel}`].key, Tileset.key);


    this.map.createLayer('thirdLayer');
    this.map.createLayer('secondLayer');
    this.map.createLayer('firstLayer');
    // This resizes the game world to match the layer dimensions
    this.collisionLayer = this.map.createLayer('colissionLayer');
    this.map.setCollisionByExclusion([], true, this.collisionLayer);

    this.collisionLayer.resizeWorld();

    this.hero = new Character(this.game, 64 , 352, HeroSprite.key, 0);
    this.game.add.existing(this.hero);
    this.game.camera.follow(this.hero);

    this.marker = null;
    this.createTileSelector();
    this.game.input.addMoveCallback(this.updateMarker, this);

    this.mapManager = new MapManager(this.map, MaxLayer);
    this.mapManager.setUpCollisionLayer(this.collisionLayer);

    this.text = new InformationString(this.game, 100, Levels[`Level${this.indexLevel}`].text );
    this.game.add.existing(this.text);
    this.text.blink();

    this.keyRemoveLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.keyRemoveLayer.onDown.add(this.eraseBlockKeyboard, this);

    this.keyUndoLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);

    this.keyUpLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.keyUpLayer.onDown.add(this.moveUp, this);
    this.keyDownLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.keyDownLayer.onDown.add(this.moveDown, this);
    this.keyLeftLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.keyLeftLayer.onDown.add(this.moveLeft, this);
    this.keyRightLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.keyRightLayer.onDown.add(this.moveRight, this);

    this.game.time.advancedTiming = true;
  }


  update() {
    this.game.physics.arcade.collide(this.hero, this.collisionLayer, this.additionalCheck, this.hasPortal , this);
    if(this.hero.y > Height + this.hero.height) {
      this.game.reset();
    }
  }

  hasPortal(tile1, tile2) {
    if(tile2.properties && tile2.properties.portal == 1 && !this.mapManager.portalEnable()) {
      return false;
    }
    return true;
  }

  additionalCheck(tile1, tile2) {
    if(!tile2.properties) {
      return;
    }

    if(tile2.properties.is_gem == 1) {
      this.map.removeTile(tile2.x, tile2.y, "colissionLayer").destroy();
      this.mapManager.killGem();
      return;
    }

    if(tile2.properties.portal == 1 && this.mapManager.portalEnable()) {
      //maybe make an animation
      this.game.nextLevel();
    }
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    this.game.load.tilemap(Levels[`Level${this.indexLevel}`].key, `res/${Levels[`Level${this.indexLevel}`].path}` , null, Phaser.Tilemap.TILED_JSON);
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
  }

  eraseBlockKeyboard() {
    this.mapManager.eraseBlock(this.marker.x / Size, this.marker.y / Size);
    this.hero.eraseBlocksAnimation(this.marker);
  }

  undoBlockKeyboard() {
    this.mapManager.undoBlock(this.marker.x / Size, this.marker.y / Size);
    this.hero.eraseBlocksAnimation(this.marker);
  }

  updateMarker() {
    this.marker.x = this.game.math.snapToFloor(this.game.input.activePointer.worldX, CursorSize, 0);
    this.marker.y = this.game.math.snapToFloor(this.game.input.activePointer.worldY, CursorSize, 0);

    if (this.game.input.mousePointer.isDown && this.marker.y > Size) {
      this.mapManager.eraseBlock(this.marker.x / Size, this.marker.y / Size);
      this.hero.eraseBlocksAnimation(this.marker);
    }
  }

  createTileSelector() {
    //Our painting marker
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0xFF0000, 1);
    this.marker.drawRect(0, 0, CursorSize, CursorSize);
    this.marker.x = 4 * CursorSize;
    this.marker.y = 4 * CursorSize;
  }

  moveUp() {
    this.marker.y -= CursorSize;
    if(this.marker.y < 0) {
      this.marker.y = 0;
    }
  }

  moveDown() {
    this.marker.y += CursorSize;
    if(this.marker.y > Height - CursorSize) {
      this.marker.y = Height - CursorSize;
    }
  }

  moveLeft() {
    this.marker.x -= CursorSize;
    if(this.marker.x < 0) {
      this.marker.x = 0;
    }
  }

  moveRight() {
    this.marker.x += CursorSize;
    if(this.marker.x > Width - CursorSize) {
      this.marker.x = Width - CursorSize;
    }
  }

}

export default MainView;
