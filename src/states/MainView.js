import { WidthSpriteSheetHero, HeightSpriteSheetHero, Size, CursorSize, Width, Height, HudText, HudTextX, HudTextY, WidthLevel } from '../Constants.js';
import { Tileset, Level1, Levels, HeroSprite, MaxLevel } from '../ConstantsKey.js';
import Character from 'objects/Character';
import InformationString from 'objects/InformationString';

import MapManager from "objects/MapManager";
import Controls from "objects/Controls";

class MainView extends Phaser.State {

  constructor() {
    super();
  }

  init(indexLevel) {
    this.indexLevel = indexLevel || 1;
    this.hasLevel = MaxLevel >= this.indexLevel;
    if(!this.game.controls) {
      let controls = new Controls(this.game);
      controls.PostMortemDefaultConfig();
      this.game.controls = controls;
    }
    //no more levels :|
  }

  create() {
    if(!this.hasLevel) {
      this.game.goToFinalScene();
    } else {

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

      this.hero = new Character(this.game, Levels[`Level${this.indexLevel}`].playerPosition.x , Levels[`Level${this.indexLevel}`].playerPosition.y, HeroSprite.key, 0);
      this.game.add.existing(this.hero);
      this.game.camera.follow(this.hero);

      const lastLayer = Levels[`Level${this.indexLevel}`].lastLayer;
      this.marker = null;
      this.createTileSelector();
      if(lastLayer === 3) {
        this.marker.visible = false;
      }
      this.game.input.addMoveCallback(this.updateMarker, this);

      this.mapManager = new MapManager(this.map, lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      this.text = new InformationString(this.game, Width/2, Levels[`Level${this.indexLevel}`].text );
      this.game.add.existing(this.text);
      this.text.blink();

      this.hud = this.game.add.text(400, 400, HudText, { font: "bold 22px Arial", fill: '#FFFFFF' });
      this.hud.x = this.game.camera.x + HudTextX;
      this.hud.y = this.game.camera.y + HudTextY;

      this.keyRemoveLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("undoLayer"));
      this.keyRemoveLayer.onDown.add(this.eraseBlockKeyboard, this);
      this.keyUndoLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("removeLayer"));
      this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);

      if(this.game.controls.hasGamepad()) {
        let buttonB = this.game.controls.pad.getButton(Phaser.Gamepad.XBOX360_B);
        buttonB.onDown.add(this.eraseBlockKeyboard, this);

        let buttonX = this.game.controls.pad.getButton(Phaser.Gamepad.XBOX360_X);
        buttonX.onDown.add(this.undoBlockKeyboard, this);
      }
      this.keyUpLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("moveUpCursor"));
      this.keyUpLayer.onDown.add(this.moveUp, this);
      this.keyDownLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("moveDownCursor"));
      this.keyDownLayer.onDown.add(this.moveDown, this);
      this.keyLeftLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("moveLeftCursor"));
      this.keyLeftLayer.onDown.add(this.moveLeft, this);
      this.keyRightLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("moveRightCursor"));
      this.keyRightLayer.onDown.add(this.moveRight, this);
      this.game.time.advancedTiming = true;
    }
  }


  update() {
    this.game.physics.arcade.overlap(this.hero, this.collisionLayer, this.additionalCheckOverlap, null , this);
    this.game.physics.arcade.collide(this.hero, this.collisionLayer, this.additionalCheckCollide, this.hasPortal, this);
    if(this.hero.y > Height + this.hero.height) {
      this.game.reset();
    }
    if(this.game.controls.hasGamepad()) {
      this.commandsPad();
    }
    this.updateGui();
  }

  commandsPad() {
    if(!this.game.controls.isMovingRightPad) {
      this.game.controls.isMovingRightPad = true;
      this.game.controls.delayControl(50)
      if (this.game.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) < -0.5 ) {
        this.moveLeft();
      }
      else if (this.game.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X) > 0.5) {
        this.moveRight();
      }

      if (this.game.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) < -0.5) {
        this.moveUp();
      } else if (this.game.controls.pad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y) > 0.5) {
        this.moveDown();
      }
    }
  }

  updateGui() {
    this.hud.setText(HudText + this.mapManager.currentGems + " / " + this.mapManager.nbGems);
    this.hud.x = this.game.camera.x + HudTextX;
    this.hud.y = this.game.camera.y + HudTextY;

  }

  hasPortal(tile1, tile2) {
    if(tile2.properties && tile2.properties.portal == 1 && !this.mapManager.portalEnable()) {
      return false;
    }
    return true;
  }

  additionalCheckCollide(tile1, tile2) {
    if(tile2.properties.portal == 1 && this.mapManager.portalEnable()) {
      //maybe make an animation
      this.game.nextLevel();
    }
  }

  additionalCheckOverlap(tile1, tile2) {
    if(!tile2.properties) {
      return;
    }

    if(tile2.properties.layer_gem == 1) {
      if(tile2.properties.layer_destroy) {
        this.mapManager.removeLayer();
      } else if (tile2.properties.layer_rollback) {
        this.mapManager.undoLayer();
      }
      this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
      return;
    }

    if(tile2.properties.is_gem == 1) {
      this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
      this.mapManager.killGem();
      return;
    }

    if(tile2.properties.trigger) {
      this.mapManager.removeCollisionsAndAddElements(tile2.properties.layer_index);
      this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
      return;
    }
  }

  preload() {
    this.game.load.spritesheet(HeroSprite.key, `res/${HeroSprite.path}`, WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image(Tileset.key, `res/${Tileset.path}`);
    if(this.hasLevel) {
      this.game.load.tilemap(Levels[`Level${this.indexLevel}`].key, `res/${Levels[`Level${this.indexLevel}`].path}` , null, Phaser.Tilemap.TILED_JSON);
    }
  }

  render() {
    //this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
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
    this.marker.lineStyle(2, 0xea4335, 1);
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
    if(this.marker.y > Height) {
      this.marker.y -= CursorSize;
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
    if(this.marker.x > WidthLevel) {
      this.marker.x -= CursorSize;
    }
  }

}

export default MainView;
