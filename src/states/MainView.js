import { StringDialog, TextPosition, FloorY, WidthSpriteSheetHero, HeightSpriteSheetHero } from '../Constants.js';
import Character from 'objects/Character';
import { loadColissionMap } from "../platformerUtils.js";

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

    this.map = this.game.add.tilemap('Map1');
    this.map.addTilesetImage('myTileset', 'Tileset');
    loadColissionMap(this.map);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();

    this.ladder = this.game.add.sprite(224,221, "Ladder");
    this.ladder.body.immovable = true;

    this.computer = this.game.add.sprite(29, 40 - 390, "computer");

    this.hero = new Character(this.game, 20 , 40, "test", 0);
    this.game.add.existing(this.hero);
    this.game.camera.follow(this.hero);

    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    this.game.time.advancedTiming = true;
  }


  update() {
    this.game.physics.arcade.collide(this.hero, this.layer);
  }

  preload() {
    this.game.load.spritesheet("test", "res/hero.png", WidthSpriteSheetHero, HeightSpriteSheetHero);
    this.game.load.image('Tileset', "res/tileset.png");
    this.game.load.image("computer", "res/computer.png");
    this.game.load.image('Ladder', "res/ladder.png");
    this.game.load.tilemap('Map1', "res/firstLevel.json", null, Phaser.Tilemap.TILED_JSON);
  }

   //render() {
     //this.game.debug.spriteInfo(this.hero, 32, 400);
     //this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
   //}

}

export default MainView;
