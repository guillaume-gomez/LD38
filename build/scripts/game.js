(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Width = exports.Width = 1024;
var Height = exports.Height = 576;
var Size = exports.Size = 32;
var WidthLevel = exports.WidthLevel = Size * 34;
var HeightLevel = exports.HeightLevel = Size * 19;
var CursorLength = exports.CursorLength = 3;
var CursorSize = exports.CursorSize = CursorLength * Size;
var WidthSpriteSheetHero = exports.WidthSpriteSheetHero = 64;
var HeightSpriteSheetHero = exports.HeightSpriteSheetHero = 96;
var HeroRatio = exports.HeroRatio = 0.75;
var BabyRatio = exports.BabyRatio = 0.50;

var TextPosition = exports.TextPosition = 55;

var TextColor = exports.TextColor = "#8cc169";

var Code = exports.Code = "9356";
var StyleRef = exports.StyleRef = { font: "bold 8px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
var Style = exports.Style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

var BackgroundColor = exports.BackgroundColor = 0x212A43;

var HudText = exports.HudText = "Gems : ";
var HudTextX = exports.HudTextX = 10;
var HudTextY = exports.HudTextY = 540;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Key = "Test";

var Tileset = exports.Tileset = {
  path: "tileset.png",
  key: "tileset"
};

var Level1 = exports.Level1 = {
  path: "LVL_1.json",
  key: Key,
  lastLayer: 3,
  text: "",
  playerPosition: { x: 64, y: 352 }
};

var Level2 = exports.Level2 = {
  path: "LVL_6.json",
  key: Key,
  lastLayer: 3,
  text: "",
  playerPosition: { x: 64, y: 20 }
};

var Level3 = exports.Level3 = {
  path: "LVL_2.json",
  key: Key,
  lastLayer: 2,
  text: "The gap seems too large. You might want to use your power",
  playerPosition: { x: 64, y: 352 }
};

var Level4 = exports.Level4 = {
  path: "LVL_7.json",
  key: Key,
  lastLayer: 2,
  text: "",
  playerPosition: { x: 64, y: 20 }
};

var Level5 = exports.Level5 = {
  path: "LVL_3.json",
  key: Key,
  lastLayer: 2,
  text: "A layer can help you, but it could stop you too. Press Shift to rollback.",
  playerPosition: { x: 64, y: 352 }
};

var Level6 = exports.Level6 = {
  path: "LVL_4.json",
  key: Key,
  lastLayer: 1,
  text: "You may need to remove more than one layer",
  playerPosition: { x: 64, y: 352 }
};

var Levels = exports.Levels = {
  Level1: Level1,
  Level2: Level2,
  Level3: Level3,
  Level4: Level4,
  Level5: Level5,
  Level6: Level6
};

var HeroSprite = exports.HeroSprite = {
  key: "hero",
  path: "hero.png"
};

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _MainView = require('states/MainView');

var _MainView2 = _interopRequireDefault(_MainView);

var _MainMenu = require('states/MainMenu');

var _MainMenu2 = _interopRequireDefault(_MainMenu);

var _Commands = require('states/Commands');

var _Commands2 = _interopRequireDefault(_Commands);

var _Introduction = require('states/Introduction');

var _Introduction2 = _interopRequireDefault(_Introduction);

var _Constants = require('./Constants.js');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _Constants.Width, _Constants.Height, Phaser.AUTO, 'content', null));

    _this.currentLevel = 1;
    _this.state.add('MainMenu', _MainMenu2.default, false);
    _this.state.add('MainView', _MainView2.default, false);
    _this.state.add('Commands', _Commands2.default, false);
    //this.state.add('Introduction', Introduction, false);
    _this.state.start('MainMenu');
    return _this;
  }

  _createClass(Game, [{
    key: 'goToMainGame',
    value: function goToMainGame() {
      this.state.start('MainView');
    }
  }, {
    key: 'goToCommands',
    value: function goToCommands() {
      this.state.start('Commands');
    }
  }, {
    key: 'goToMenu',
    value: function goToMenu() {
      this.state.start('MainMenu');
      this.currentLevel = 1;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.state.start('MainView', Phaser.Plugin.StateTransition.In.ScaleUp, Phaser.Plugin.StateTransition.Out.SlideBottom, true, true, this.currentLevel);
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      this.currentLevel++;
      this.state.start('MainView', Phaser.Plugin.StateTransition.In.SlideLeft, null, true, true, this.currentLevel);
    }
  }]);

  return Game;
}(Phaser.Game);

new Game();

},{"./Constants.js":1,"states/Commands":8,"states/Introduction":9,"states/MainMenu":10,"states/MainView":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require("../Constants.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var LimitY = 550;
var TimeLapse = 10;

var Character = function (_Phaser$Sprite) {
  _inherits(Character, _Phaser$Sprite);

  function Character(game, x, y, key, frame) {
    _classCallCheck(this, Character);

    //Enable physics on the player
    var _this = _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, game, x, y, key, frame));

    game.physics.arcade.enable(_this);
    _this.body.bounce.x = _this.body.bounce.y = 0;

    _this.upKey = game.input.keyboard.addKey(_this.game.controls.getKey("jump"));
    _this.leftKey = game.input.keyboard.addKey(_this.game.controls.getKey("left"));
    _this.rightKey = game.input.keyboard.addKey(_this.game.controls.getKey("right"));

    _this.locked = true;

    _this.jumpCount = 0;

    _this.body.gravity.y = 0;
    var fn = function fn() {
      _this.body.gravity.y = 750;
      _this.locked = false;
      _this.upKey.onDown.add(_this.checkDoubleJump, _this);
    };
    setTimeout(fn, 500);
    var leftArray = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15];
    var rightArray = [31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16];
    var JumpArrayRight = [64, 65, 66];
    var JumpArrayLeft = [80, 81, 82];
    var PowerLeft = [48, 48, 48, 48];
    var PowerRight = [32, 32, 32, 32];
    var IdleRight = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
    var IdleLeft = [128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142];
    _this.scale.setTo(_Constants.HeroRatio, _Constants.HeroRatio);

    _this.animations.add('jumpLeft', JumpArrayLeft, TimeLapse, true);
    _this.animations.add('jumpRight', JumpArrayRight, TimeLapse, true);
    _this.animations.add('left', rightArray, TimeLapse, true);
    _this.animations.add('right', leftArray, TimeLapse, true);
    _this.animations.add('powerLeft', PowerLeft, TimeLapse, true);
    _this.animations.add('powerRight', PowerRight, TimeLapse, true);
    _this.animations.add('idleRight', IdleRight, TimeLapse, true);
    _this.animations.add('idleLeft', IdleLeft, TimeLapse, true);
    _this.direction = 1;
    return _this;
  }

  _createClass(Character, [{
    key: "update",
    value: function update() {
      if (this.locked) {
        this.body.velocity.x = 0;
        return;
      }

      if (this.leftKey.isDown) {
        this.body.velocity.x = -200;
        this.animations.play("left", TimeLapse);
        this.direction = -1;
      } else if (this.rightKey.isDown) {
        this.body.velocity.x = 200;
        this.animations.play("right", TimeLapse);
        this.direction = 1;
      } else {
        this.body.velocity.x = 0;
      }

      // // Make the player jump if he is touching the ground
      // if (this.upKey.isDown  && this.jumpCount < 2) {
      //   console.log('jumpCount')
      //   this.body.velocity.y = -225;
      //   if(this.body.velocity.x === 0) {
      //     if(this.direction === -1) {
      //       this.animations.play("jumpLeft", TimeLapse);
      //     } else {
      //       this.animations.play("jumpRight", TimeLapse);
      //     }
      //   }
      //   this.jumpCount++;
      // }

      if (this.body.velocity.x == 0 && this.body.velocity.y == 0) {
        if (this.direction == -1) {
          this.animations.play("idleLeft", TimeLapse);
        } else {
          this.animations.play("idleRight", TimeLapse);
        }
        //this.frame = this.direction ===  1 ? 0 : 29;
      }

      if (this.body.onFloor()) {
        this.jumpCount = 0;
      }
    }
  }, {
    key: "checkDoubleJump",
    value: function checkDoubleJump() {
      if (this.jumpCount < 2) {
        this.body.velocity.y = -225;
        if (this.body.velocity.x === 0) {
          if (this.direction === -1) {
            this.animations.play("jumpLeft", TimeLapse);
          } else {
            this.animations.play("jumpRight", TimeLapse);
          }
        }
        this.jumpCount++;
      }
    }
  }, {
    key: "isDeath",
    value: function isDeath() {
      if (!this.body) {
        return false;
      }
      return this.body.position.y > LimitY;
    }
  }, {
    key: "eraseBlocksAnimation",
    value: function eraseBlocksAnimation(cursor) {
      if (this.x < cursor.x) {
        this.frame = 32;
        this.direction = 1;
        //this.animations.play('powerLeft', TimeLapse);
      } else {
        this.frame = 48;
        this.direction = -1;
        //this.animations.play('powerRight', TimeLapse);
      }
    }
  }]);

  return Character;
}(Phaser.Sprite);

exports.default = Character;

},{"../Constants.js":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Actions = ["left", "right", "jump", "moveLeftCursor", "moveRightCursor", "moveDownCursor", "moveUpCursor", "undoLayer", "removeLayer"];

var Controls = function () {
  function Controls() {
    var controlsSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var actionList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Actions;

    _classCallCheck(this, Controls);

    this.controlsSettings = controlsSettings;
    this.actionList = actionList;
    this.isQwerty = true;
  }

  _createClass(Controls, [{
    key: "getKey",
    value: function getKey(action) {
      if (!this.controlsSettings[action]) {
        console.error("cannot find " + action + " in the action list");
      }
      return this.controlsSettings[action];
    }
  }, {
    key: "addControls",
    value: function addControls(params) {
      var _this = this;

      Object.keys(params).forEach(function (action) {
        return _this.addControl(params[action], action);
      });
    }
  }, {
    key: "qwertyKeyboard",
    value: function qwertyKeyboard() {
      return {
        "left": Phaser.Keyboard.A,
        "right": Phaser.Keyboard.D,
        "jump": Phaser.Keyboard.W,
        "undoLayer": Phaser.Keyboard.SPACEBAR,
        "removeLayer": Phaser.Keyboard.SHIFT
      };
    }
  }, {
    key: "azertyKeyBoard",
    value: function azertyKeyBoard() {
      return {
        "left": Phaser.Keyboard.Q,
        "right": Phaser.Keyboard.D,
        "jump": Phaser.Keyboard.Z,
        "undoLayer": Phaser.Keyboard.SPACEBAR,
        "removeLayer": Phaser.Keyboard.SHIFT
      };
    }
  }, {
    key: "padConfig",
    value: function padConfig() {
      return {
        "jump": Phaser.Gamepad.XBOX360_A,
        "undoLayer": Phaser.Gamepad.XBOX360_X,
        "removeLayer": Phaser.Gamepad.XBOX360_B
      };
    }
  }, {
    key: "injectPropsDueToKeyboardType",
    value: function injectPropsDueToKeyboardType() {
      if (!this.isQwerty) {
        return this.azertyKeyBoard();
      }
      return this.qwertyKeyboard();
    }
  }, {
    key: "defaultConfig",
    value: function defaultConfig() {
      var defaultConfigParams = {
        "moveLeftCursor": Phaser.Keyboard.A,
        "moveRightCursor": Phaser.Keyboard.D,
        "moveDownCursor": Phaser.Keyboard.S,
        "moveUpCursor": Phaser.Keyboard.W
      };
      this.addControls(defaultConfigParams);
    }
  }, {
    key: "PostMortemDefaultConfig",
    value: function PostMortemDefaultConfig() {
      var defaultConfigParams = {
        "moveLeftCursor": Phaser.Keyboard.LEFT,
        "moveRightCursor": Phaser.Keyboard.RIGHT,
        "moveDownCursor": Phaser.Keyboard.DOWN,
        "moveUpCursor": Phaser.Keyboard.UP
      };

      defaultConfigParams = Object.assign({}, defaultConfigParams, this.injectPropsDueToKeyboardType());
      this.addControls(defaultConfigParams);
    }

    // // { {ref: pointer, action: left key: Z}}
    // setUpControl(params) {

    //   this.keyUndoLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    //   this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);
    // }

  }, {
    key: "addControl",
    value: function addControl(key, action) {
      if (!this.actionList.includes(action)) {
        console.error("the action named '" + action + "' does not exist");
      }
      this.controlsSettings[action] = key;
    }
  }, {
    key: "toggleKeyboardType",
    value: function toggleKeyboardType() {
      this.isQwerty = !this.isQwerty;
      this.PostMortemDefaultConfig();
    }
  }, {
    key: "export",
    value: function _export() {
      return this.controlsSettings;
    }
  }, {
    key: "hasGamepad",
    value: function hasGamepad(game) {
      return game.input.gamepad.supported && game.input.gamepad.active && game.input.gamepad.pad1.connected;
    }
  }, {
    key: "initAndInstallGamepad1",
    value: function initAndInstallGamepad1(game) {
      game.input.gamepad.start();
      return game.input.gamepad.pad1;
    }
  }]);

  return Controls;
}();

exports.default = Controls;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants.js');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Timer = 5000;

var InformationString = function (_Phaser$Text) {
  _inherits(InformationString, _Phaser$Text);

  function InformationString(game, x, text) {
    var timer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Timer;

    _classCallCheck(this, InformationString);

    var _this = _possibleConstructorReturn(this, (InformationString.__proto__ || Object.getPrototypeOf(InformationString)).call(this, game, x, _Constants.TextPosition, text, _Constants.Style));

    game.input.keyboard.addCallbacks(_this, null, null, _this.keyPress);
    _this.anchor.set(0.5);
    _this.visible = false;
    _this.timer = timer;

    if (text.length !== 0) {
      _this.bar = game.add.graphics();
      _this.bar.beginFill(0x000000, 0.2);
      _this.bar.drawRect(0, 0, _Constants.Width, 80);
    }
    return _this;
  }

  _createClass(InformationString, [{
    key: 'blink',
    value: function blink() {
      var _this2 = this;

      var fn = function fn() {
        _this2.visible = false;
        if (_this2.bar) _this2.bar.destroy();
      };
      setTimeout(fn, this.timer);
      this.visible = true;
    }
  }]);

  return InformationString;
}(Phaser.Text);

exports.default = InformationString;

},{"../Constants.js":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require("../Constants.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var LengthAnimation = 50;
var MaxLayer = 3;
var DefaultTiles = [{ layer_index: 3, tile: 1152 }, { layer_index: 2, tile: 1184 }, { layer_index: 1, tile: 1216 }];

var MapManager = function () {
  function MapManager(map, lastLayerAvailable) {
    _classCallCheck(this, MapManager);

    this.removedBlock = [];
    this.cacheCollisionLayer = [];
    this.lastLayerAvailable = lastLayerAvailable;
    this.map = map;
    this.nbGems = 0;
    this.currentGems = 0;
    this.doorSprites = [];
    this.visibleDoor = false;
  }

  _createClass(MapManager, [{
    key: "shouldPicked",
    value: function shouldPicked(tile) {
      return tile.properties.is_gem == 1 || tile.properties.layer_gem == 1 || tile.properties.trigger === true;
    }
  }, {
    key: "findLayerToDestroy",
    value: function findLayerToDestroy(x, y, lengthX, lengthY) {
      //layer can be deleted 3 and 2
      var layerIndex = MaxLayer;
      for (var index = MaxLayer; index > 1; index--) {
        if (this.map.getTile(x, y, index) === null && this.map.getTile(x + lengthX - 1, y + lengthY - 1, index) === null) {
          layerIndex--;
        } else {
          break;
        }
      }
      //impossible
      if (layerIndex <= 1 || layerIndex <= this.lastLayerAvailable) {
        return -1;
      }
      return layerIndex;
    }
  }, {
    key: "setUpCollisionLayer",
    value: function setUpCollisionLayer(colissionLayer) {
      var _this = this;

      colissionLayer.layer.data.forEach(function (column) {
        column.forEach(function (tile) {
          if (tile.properties.layer_index && tile.properties.layer_index != MaxLayer) {
            _this.cacheCollisionLayer.push(tile);
            _this.map.removeTile(tile.x, tile.y, "colissionLayer");
          }

          if (tile.properties.layer_index) {
            tile.alpha = 0;
          }

          if (_this.shouldPicked(tile)) {
            if (tile.properties.layer_index == MaxLayer) {
              tile.alpha = 1;
            } else {
              tile.alpha = 0;
            }
          }

          if (tile.properties.is_gem == 1) {
            _this.nbGems++;
          }

          if (tile.properties.portal == 1) {
            _this.doorSprites.push(tile);
            tile.alpha = 0;
          }
        });
      });
    }
  }, {
    key: "eraseBlock",
    value: function eraseBlock(x, y) {
      var _this2 = this;

      var nbTiles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.CursorLength;

      var lengthY = nbTiles;
      var lengthX = nbTiles;
      //check the layers associated to the deletion;
      var objectsRemoves = [];
      var indexRemoval = 0;
      var layerIndex = this.findLayerToDestroy(x, y, lengthX, lengthY);
      //cannot destroy
      if (layerIndex == -1) {
        return;
      }

      var _loop = function _loop(xAxis) {
        var _loop2 = function _loop2(yAxis) {
          _this2.handleCollisionBlockOnErase(xAxis, yAxis, layerIndex);

          var fn = function fn() {
            var tile = _this2.map.removeTile(xAxis, yAxis, layerIndex);
            objectsRemoves.push(tile);
          };
          setTimeout(fn, indexRemoval * LengthAnimation);
          indexRemoval++;
          if (indexRemoval > _Constants.CursorLength) {
            indexRemoval = 0;
          }
        };

        for (var yAxis = y; yAxis < y + lengthY; yAxis++) {
          _loop2(yAxis);
        }
      };

      for (var xAxis = x; xAxis < x + lengthX; xAxis++) {
        _loop(xAxis);
      }
      this.removedBlock.push({ tiles: objectsRemoves, layerIndex: layerIndex, x: x, y: y });
      this.removedBlock.sort(this.sortByLayerIndex);
    }
  }, {
    key: "removeLayer",
    value: function removeLayer() {
      for (var x = 0; x < _Constants.WidthLevel / _Constants.Size; x++) {
        for (var y = 0; y < _Constants.HeightLevel / _Constants.Size; y++) {
          this.eraseBlock(x, y, 1);
        }
      }
    }
  }, {
    key: "undoLayer",
    value: function undoLayer() {
      for (var x = 0; x < _Constants.WidthLevel / _Constants.Size; x++) {
        for (var y = 0; y < _Constants.HeightLevel / _Constants.Size; y++) {
          this.undoBlock(x, y, 1);
        }
      }
    }
  }, {
    key: "handleCollisionBlockOnErase",
    value: function handleCollisionBlockOnErase(x, y, layerIndex) {
      var collidedTile = this.map.getTile(x, y, "colissionLayer");
      if (collidedTile && collidedTile.properties) {
        if (collidedTile.properties.layer_index >= layerIndex) {
          if (!collidedTile.properties || !collidedTile.properties.portal) {
            this.cacheCollisionLayer.push(collidedTile);
            this.map.removeTile(x, y, "colissionLayer");
          }
        }
      } else {
        //dont find the tile in the layer, so the tile might be in the deleted tiles
        var indexRemoveCollisionBlock = 0;
        var tileToInsert = this.cacheCollisionLayer.find(function (tile, index) {
          indexRemoveCollisionBlock = index;
          return tile.x === x && tile.y === y;
        });
        if (!tileToInsert) {
          return;
        }
        if (tileToInsert.properties.layer_index == layerIndex - 1) {
          var newTile = this.map.putTile(tileToInsert, tileToInsert.x, tileToInsert.y, "colissionLayer");
          //copy property
          newTile.properties = Object.assign({}, tileToInsert.properties);
          if (!this.shouldPicked(newTile)) {
            newTile.alpha = 0;
          }
          this.cacheCollisionLayer.splice(indexRemoveCollisionBlock, 1);
        }
      }
    }
  }, {
    key: "handleCollisionBlockOnUndo",
    value: function handleCollisionBlockOnUndo(x, y, layerIndex) {
      var collidedTile = this.map.getTile(x, y, "colissionLayer");
      if (collidedTile && collidedTile.properties) {
        //remove collision block
        if (collidedTile.properties.layer_index < layerIndex) {
          this.cacheCollisionLayer.push(collidedTile);
          this.map.removeTile(x, y, "colissionLayer");
        }
      } else {
        //dont find the tile in the layer, so the tile might be in the deleted tiles
        var indexRemoveCollisionBlock = 0;
        var tileToInsert = this.cacheCollisionLayer.find(function (tile, index) {
          indexRemoveCollisionBlock = index;
          return tile.x === x && tile.y === y;
        });
        if (!tileToInsert) {
          return;
        }
        if (tileToInsert.properties.layer_index == layerIndex) {
          var newTile = this.map.putTile(tileToInsert, tileToInsert.x, tileToInsert.y, "colissionLayer");
          //copy property
          newTile.properties = Object.assign({}, tileToInsert.properties);
          if (!this.shouldPicked(newTile)) {
            newTile.alpha = 0;
          }
          this.cacheCollisionLayer.splice(indexRemoveCollisionBlock, 1);
        }
      }
    }
  }, {
    key: "sortByLayerIndex",
    value: function sortByLayerIndex(a, b) {
      return a.layerIndex > b.layerIndex;
    }
  }, {
    key: "undoBlock",
    value: function undoBlock(x, y) {
      var _this3 = this;

      var nbTiles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.CursorLength;

      var lengthX = nbTiles;
      var lengthY = nbTiles;
      var redoElementsArray = this.removedBlock.filter(function (list) {
        return list.x === x && list.y === y;
      });
      var redoElements = redoElementsArray.reduce(function (acc, elm) {
        if (elm.layerIndex < acc.layerIndex) {
          return elm;
        }
        return acc;
      });
      if (redoElements) {
        var indexRemoval = _Constants.CursorLength;
        redoElements.tiles.forEach(function (tile) {
          if (!tile) {
            return;
          }
          _this3.handleCollisionBlockOnUndo(tile.x, tile.y, redoElements.layerIndex);
          var collidedTile = _this3.map.getTile(tile.x, tile.y, "colissionLayer");
          if (collidedTile) {
            collidedTile.isVisible = collidedTile.isVisible ? false : true;
          }
          var fn = function fn() {
            _this3.map.putTile(tile, tile.x, tile.y, redoElements.layerIndex);
          };
          setTimeout(fn, indexRemoval * LengthAnimation);
          indexRemoval--;
          if (indexRemoval < 0) {
            indexRemoval = _Constants.CursorLength;
          }
        });
        //remove the element after
        var newArray = this.removedBlock.filter(function (elmt) {
          return elmt !== redoElements;
        });
        this.removedBlock = newArray.sort(this.sortByLayerIndex);
      }
    }
  }, {
    key: "killGem",
    value: function killGem() {
      this.currentGems++;
      if (this.nbGems === this.currentGems) {
        this.showDoor();
      }
    }
  }, {
    key: "portalEnable",
    value: function portalEnable() {
      return this.visibleDoor;
    }
  }, {
    key: "showDoor",
    value: function showDoor() {
      this.visibleDoor = true;
      this.doorSprites.forEach(function (tile, index) {
        tile.alpha = 1;
      });
    }
  }, {
    key: "removeCollisionsAndAddElements",
    value: function removeCollisionsAndAddElements(layerIndex) {
      var _this4 = this;

      var props = [];
      this.map.forEach(function (tile) {
        if (tile.properties && tile.properties.layer_index == layerIndex && tile.properties.removed_block) {
          props.push({ x: tile.x, y: tile.y });
        }
      });
      props.forEach(function (coord) {
        _this4.map.removeTile(coord.x, coord.y, "colissionLayer");
        //this.map.removeTile(coord.x, coord.y, layerIndex); CHECK IF CORRECT
        var defaultTile = DefaultTiles.find(function (object) {
          return object.layer_index == layerIndex;
        });
        _this4.map.putTile(defaultTile.tile, coord.x, coord.y, layerIndex);
      });
    }
  }]);

  return MapManager;
}();

exports.default = MapManager;

},{"../Constants.js":1}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require("../Constants.js");

var _Controls = require("../objects/Controls");

var _Controls2 = _interopRequireDefault(_Controls);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Commands = function (_Phaser$State) {
  _inherits(Commands, _Phaser$State);

  function Commands() {
    _classCallCheck(this, Commands);

    return _possibleConstructorReturn(this, (Commands.__proto__ || Object.getPrototypeOf(Commands)).apply(this, arguments));
  }

  _createClass(Commands, [{
    key: "create",
    value: function create() {
      this.game.stage.setBackgroundColor(_Constants.BackgroundColor);
      var aimText = "Mouse cursor / Arrow keys";
      var eraseLayer = "Spacebar";

      var group = this.game.add.group();
      var button = this.game.make.button(800, 20, 'button', this.switchKeyboard, this, 2, 1, 0);
      this.textInfo = this.game.add.text(870, 90, "Qwerty", { font: "bold 14px Arial", fill: "#8cc169", stroke: '#4D4D4D', strokeThickness: 1 });
      group.add(button);

      this.game.add.text(350, 25, "Commands", { font: "bold 52px Arial", fill: "#8cc169", stroke: '#4D4D4D', strokeThickness: 1 });

      this.game.add.text(50, 125, "Move", { font: "bold 32px Arial", fill: _Constants.TextColor });
      this.moveText = this.game.add.text(500, 125, "", { font: "bold 32px Arial", fill: _Constants.TextColor });

      this.game.add.text(50, 200, "Jump", { font: "bold 32px Arial", fill: _Constants.TextColor });
      this.jumpText = this.game.add.text(500, 200, "", { font: "bold 32px Arial", fill: _Constants.TextColor });

      this.game.add.text(50, 275, "Aim", { font: "bold 32px Arial", fill: _Constants.TextColor });
      this.game.add.text(500, 275, aimText, { font: "bold 32px Arial", fill: _Constants.TextColor });

      this.game.add.text(50, 350, "Swith to inner layer", { font: "bold 32px Arial", fill: _Constants.TextColor });
      this.game.add.text(500, 350, eraseLayer, { font: "bold 32px Arial", fill: _Constants.TextColor });

      this.game.add.text(50, 425, "Rollback to previous layer", { font: "bold 32px Arial", fill: _Constants.TextColor });
      this.game.add.text(500, 425, "Shift", { font: "bold 32px Arial", fill: _Constants.TextColor });

      this.game.add.text(350, 525, "Press enter to start", { font: "bold 34px Arial", fill: _Constants.TextColor });

      this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.game.input.gamepad.start();

      var controls = new _Controls2.default();
      controls.PostMortemDefaultConfig();
      this.game.controls = controls;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.enterButton.isDown) {
        this.game.goToMainGame();
      }

      if (this.game.controls.isQwerty) {
        this.moveText.setText("A / D keys");
        this.jumpText.setText("W key");
      } else {
        this.moveText.setText("Q / D keys");
        this.jumpText.setText("Z key");
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      this.game.load.spritesheet('button', "res/button_sprite_sheet.png", 193, 71);
    }
  }, {
    key: "switchKeyboard",
    value: function switchKeyboard() {
      this.game.controls.toggleKeyboardType();
      var text = this.game.controls.isQwerty ? "Qwerty" : "Azerty";
      this.textInfo.setText(text);
    }
  }]);

  return Commands;
}(Phaser.State);

exports.default = Commands;

},{"../Constants.js":1,"../objects/Controls":5}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants.js');

var _ConstantsKey = require('../ConstantsKey.js');

var _MapManager = require('objects/MapManager');

var _MapManager2 = _interopRequireDefault(_MapManager);

var _Character = require('objects/Character');

var _Character2 = _interopRequireDefault(_Character);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Introduction = function (_Phaser$State) {
  _inherits(Introduction, _Phaser$State);

  function Introduction() {
    _classCallCheck(this, Introduction);

    return _possibleConstructorReturn(this, (Introduction.__proto__ || Object.getPrototypeOf(Introduction)).call(this));
  }

  _createClass(Introduction, [{
    key: 'create',
    value: function create() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.map = this.game.add.tilemap(_ConstantsKey.Levels['Level6'].key);
      this.map.addTilesetImage(_ConstantsKey.Levels['Level6'].key, _ConstantsKey.Tileset.key);

      this.map.createLayer('thirdLayer');
      this.map.createLayer('secondLayer');
      this.map.createLayer('firstLayer');
      // This resizes the game world to match the layer dimensions
      this.collisionLayer = this.map.createLayer('colissionLayer');
      this.map.setCollisionByExclusion([], true, this.collisionLayer);

      this.collisionLayer.resizeWorld();

      this.mapManager = new _MapManager2.default(this.map, _ConstantsKey.Levels['Level6'].lastLayer);
      this.mapManager.setUpCollisionLayer(this.collisionLayer);

      var originPositionBadGuy = 200;
      var originPositionBaby = 900;

      this.baby = this.game.add.sprite(originPositionBaby, 395, 'baby');
      this.baby2 = this.game.add.sprite(originPositionBaby + 50, 395, 'baby2');
      this.badGuy = this.game.add.sprite(originPositionBadGuy, 370, 'baby3');

      this.baby.scale.setTo(_Constants.BabyRatio, _Constants.BabyRatio);
      this.baby2.scale.setTo(_Constants.BabyRatio, _Constants.BabyRatio);
      this.badGuy.scale.setTo(_Constants.HeroRatio, _Constants.HeroRatio);
      var timer = 3000;

      var tweenA = this.game.add.tween(this.badGuy).to({ y: 320 }, 2000, "Quart.easeOut");
      var tweenB = this.game.add.tween(this.badGuy).to({ x: 920 }, timer, "Quart.easeOut");
      this.tweenC = this.game.add.tween(this.badGuy).to({ x: _Constants.Width + 120 }, timer, "Quart.easeOut");
      this.tweenD = this.game.add.tween(this.baby).to({ x: _Constants.Width + 80 }, timer, "Quart.easeOut");
      this.tweenE = this.game.add.tween(this.baby2).to({ x: _Constants.Width + 100 }, timer, "Quart.easeOut");

      this.tweenF = this.game.add.tween(this.badGuy).to({ x: _Constants.Width + 100 }, timer, "Quart.easeOut");
      this.tweenG = this.game.add.tween(this.baby).to({ x: _Constants.Width + 100 }, timer, "Quart.easeOut");
      this.tweenH = this.game.add.tween(this.baby2).to({ x: 600 }, timer, "Quart.easeOut");
      this.tweenI = this.game.add.tween(this.baby).to({ x: 600 }, timer, "Quart.easeOut");

      tweenA.chain(tweenB);
      tweenB.chain(this.tweenC);
      tweenB.onComplete.add(this.catched, this);

      tweenA.start();
    }
  }, {
    key: 'catched',
    value: function catched() {
      var _this2 = this;

      this.tweenC.start();
      this.tweenD.start();
      this.tweenE.start();

      this.tweenE.onComplete.add(function () {
        _this2.camera.fade(0x000000, 300, false);
        _this2.game.camera.onFadeComplete.addOnce(_this2.resetFade([_this2.tweenF, _this2.tweenG, _this2.tweenH]), _this2);
        _this2.game.camera.onFadeComplete;
        _this2.mapManager.removeLayer();
        _this2.badGuy.x = 150;
        _this2.baby.x = 130;
        _this2.baby2.x = 170;
      }, this);

      this.tweenH.onComplete.add(function () {
        console.log("kkkk");
        _this2.camera.fade(0x000000, 300, false);
        _this2.game.camera.onFadeComplete.addOnce(_this2.resetFade([_this2.tweenF, _this2.tweenI]), _this2);
        _this2.mapManager.removeLayer();

        _this2.badGuy.x = 150;
        _this2.baby.x = 130;
        _this2.baby2.kill();
      }, this);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.spritesheet(_ConstantsKey.HeroSprite.key, 'res/' + _ConstantsKey.HeroSprite.path, _Constants.WidthSpriteSheetHero, _Constants.HeightSpriteSheetHero);
      this.game.load.image(_ConstantsKey.Tileset.key, 'res/' + _ConstantsKey.Tileset.path);
      this.game.load.tilemap(_ConstantsKey.Levels['Level6'].key, 'res/' + _ConstantsKey.Levels['Level6'].path, null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image("baby", "res/baby.png");
      this.game.load.image("baby2", "res/baby2.png");
      this.game.load.image("baby3", "res/baby3.png");
    }
  }, {
    key: 'resetFade',
    value: function resetFade(TweensArray) {
      var _this3 = this;

      return function () {
        _this3.game.camera.resetFX();
        TweensArray.forEach(function (tween) {
          console.log(tween);
          tween.start();
        });
      };
    }
  }]);

  return Introduction;
}(Phaser.State);

exports.default = Introduction;

},{"../Constants.js":1,"../ConstantsKey.js":2,"objects/Character":4,"objects/MapManager":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require("../Constants.js");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainMenu = function (_Phaser$State) {
  _inherits(MainMenu, _Phaser$State);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
  }

  _createClass(MainMenu, [{
    key: "create",
    value: function create() {
      this.game.stage.setBackgroundColor(_Constants.BackgroundColor);
      this.game.add.sprite(20, 500, "LD");
      this.game.add.sprite(0, 0, "background");
      this.game.add.text(350, 400, "Press enter to start", { font: "bold 34px Arial", fill: _Constants.TextColor });
      this.game.add.text(700, 530, "Thanks for playing ! :)", { font: "bold 19px Arial", fill: _Constants.TextColor });
      this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }
  }, {
    key: "preload",
    value: function preload() {
      this.game.load.image("LD", "res/LD.png");
      this.game.load.image("background", "res/menu.png");
    }
  }, {
    key: "update",
    value: function update() {
      if (this.enterButton.isDown) {
        this.game.goToCommands();
      }
    }
  }]);

  return MainMenu;
}(Phaser.State);

exports.default = MainMenu;

},{"../Constants.js":1}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Constants = require('../Constants.js');

var _ConstantsKey = require('../ConstantsKey.js');

var _Character = require('objects/Character');

var _Character2 = _interopRequireDefault(_Character);

var _InformationString = require('objects/InformationString');

var _InformationString2 = _interopRequireDefault(_InformationString);

var _MapManager = require('objects/MapManager');

var _MapManager2 = _interopRequireDefault(_MapManager);

var _Controls = require('objects/Controls');

var _Controls2 = _interopRequireDefault(_Controls);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MainView = function (_Phaser$State) {
  _inherits(MainView, _Phaser$State);

  function MainView() {
    _classCallCheck(this, MainView);

    return _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this));
  }

  _createClass(MainView, [{
    key: 'init',
    value: function init(indexLevel) {
      this.indexLevel = indexLevel || 1;
      this.hasLevel = Object.keys(_ConstantsKey.Levels).length >= this.indexLevel;
      if (!this.game.controls) {
        var controls = new _Controls2.default();
        controls.PostMortemDefaultConfig();
        this.game.controls = controls;
      }
      //no more levels :|
    }
  }, {
    key: 'create',
    value: function create() {
      if (!this.hasLevel) {
        this.game.goToMenu();
      } else {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the physics engine to all game objects
        this.game.world.enableBody = true;

        this.map = this.game.add.tilemap(_ConstantsKey.Levels['Level' + this.indexLevel].key);
        this.map.addTilesetImage(_ConstantsKey.Levels['Level' + this.indexLevel].key, _ConstantsKey.Tileset.key);

        this.map.createLayer('thirdLayer');
        this.map.createLayer('secondLayer');
        this.map.createLayer('firstLayer');
        // This resizes the game world to match the layer dimensions
        this.collisionLayer = this.map.createLayer('colissionLayer');
        this.map.setCollisionByExclusion([], true, this.collisionLayer);

        this.collisionLayer.resizeWorld();

        this.hero = new _Character2.default(this.game, _ConstantsKey.Levels['Level' + this.indexLevel].playerPosition.x, _ConstantsKey.Levels['Level' + this.indexLevel].playerPosition.y, _ConstantsKey.HeroSprite.key, 0);
        this.game.add.existing(this.hero);
        this.game.camera.follow(this.hero);

        this.marker = null;
        this.createTileSelector();
        this.game.input.addMoveCallback(this.updateMarker, this);

        this.mapManager = new _MapManager2.default(this.map, _ConstantsKey.Levels['Level' + this.indexLevel].lastLayer);
        this.mapManager.setUpCollisionLayer(this.collisionLayer);

        this.text = new _InformationString2.default(this.game, _Constants.Width / 2, _ConstantsKey.Levels['Level' + this.indexLevel].text);
        this.game.add.existing(this.text);
        this.text.blink();

        this.hud = this.game.add.text(400, 400, _Constants.HudText, { font: "bold 22px Arial", fill: '#FFFFFF' });
        this.hud.x = this.game.camera.x + _Constants.HudTextX;
        this.hud.y = this.game.camera.y + _Constants.HudTextY;

        this.keyRemoveLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("undoLayer"));
        this.keyRemoveLayer.onDown.add(this.eraseBlockKeyboard, this);
        this.keyUndoLayer = this.game.input.keyboard.addKey(this.game.controls.getKey("removeLayer"));
        this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);

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
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.overlap(this.hero, this.collisionLayer, this.additionalCheckOverlap, null, this);
      this.game.physics.arcade.collide(this.hero, this.collisionLayer, this.additionalCheckCollide, this.hasPortal, this);
      if (this.hero.y > _Constants.Height + this.hero.height) {
        this.game.reset();
      }

      this.updateGui();
    }
  }, {
    key: 'updateGui',
    value: function updateGui() {
      this.hud.setText(_Constants.HudText + this.mapManager.currentGems + " / " + this.mapManager.nbGems);
      this.hud.x = this.game.camera.x + _Constants.HudTextX;
      this.hud.y = this.game.camera.y + _Constants.HudTextY;
    }
  }, {
    key: 'hasPortal',
    value: function hasPortal(tile1, tile2) {
      if (tile2.properties && tile2.properties.portal == 1 && !this.mapManager.portalEnable()) {
        return false;
      }
      return true;
    }
  }, {
    key: 'additionalCheckCollide',
    value: function additionalCheckCollide(tile1, tile2) {
      if (tile2.properties.portal == 1 && this.mapManager.portalEnable()) {
        //maybe make an animation
        this.game.nextLevel();
      }
    }
  }, {
    key: 'additionalCheckOverlap',
    value: function additionalCheckOverlap(tile1, tile2) {
      if (!tile2.properties) {
        return;
      }

      if (tile2.properties.layer_gem == 1) {
        if (tile2.properties.layer_destroy) {
          this.mapManager.removeLayer();
        } else if (tile2.properties.layer_rollback) {
          this.mapManager.undoLayer();
        }
        this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
        return;
      }

      if (tile2.properties.is_gem == 1) {
        this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
        this.mapManager.killGem();
        return;
      }

      if (tile2.properties.trigger) {
        this.mapManager.removeCollisionsAndAddElements(tile2.properties.layer_index);
        this.map.removeTile(tile2.x, tile2.y, "colissionLayer");
        return;
      }
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.spritesheet(_ConstantsKey.HeroSprite.key, 'res/' + _ConstantsKey.HeroSprite.path, _Constants.WidthSpriteSheetHero, _Constants.HeightSpriteSheetHero);
      this.game.load.image(_ConstantsKey.Tileset.key, 'res/' + _ConstantsKey.Tileset.path);
      if (this.hasLevel) {
        this.game.load.tilemap(_ConstantsKey.Levels['Level' + this.indexLevel].key, 'res/' + _ConstantsKey.Levels['Level' + this.indexLevel].path, null, Phaser.Tilemap.TILED_JSON);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      //this.game.debug.text(this.game.time.fps, 2, 16, "#00ff00");
    }
  }, {
    key: 'eraseBlockKeyboard',
    value: function eraseBlockKeyboard() {
      this.mapManager.eraseBlock(this.marker.x / _Constants.Size, this.marker.y / _Constants.Size);
      this.hero.eraseBlocksAnimation(this.marker);
    }
  }, {
    key: 'undoBlockKeyboard',
    value: function undoBlockKeyboard() {
      this.mapManager.undoBlock(this.marker.x / _Constants.Size, this.marker.y / _Constants.Size);
      this.hero.eraseBlocksAnimation(this.marker);
    }
  }, {
    key: 'updateMarker',
    value: function updateMarker() {
      this.marker.x = this.game.math.snapToFloor(this.game.input.activePointer.worldX, _Constants.CursorSize, 0);
      this.marker.y = this.game.math.snapToFloor(this.game.input.activePointer.worldY, _Constants.CursorSize, 0);

      if (this.game.input.mousePointer.isDown && this.marker.y > _Constants.Size) {
        this.mapManager.eraseBlock(this.marker.x / _Constants.Size, this.marker.y / _Constants.Size);
        this.hero.eraseBlocksAnimation(this.marker);
      }
    }
  }, {
    key: 'createTileSelector',
    value: function createTileSelector() {
      //Our painting marker
      this.marker = this.game.add.graphics();
      this.marker.lineStyle(2, 0xea4335, 1);
      this.marker.drawRect(0, 0, _Constants.CursorSize, _Constants.CursorSize);
      this.marker.x = 4 * _Constants.CursorSize;
      this.marker.y = 4 * _Constants.CursorSize;
    }
  }, {
    key: 'moveUp',
    value: function moveUp() {
      this.marker.y -= _Constants.CursorSize;
      if (this.marker.y < 0) {
        this.marker.y = 0;
      }
    }
  }, {
    key: 'moveDown',
    value: function moveDown() {
      this.marker.y += _Constants.CursorSize;
      if (this.marker.y > _Constants.Height) {
        this.marker.y -= _Constants.CursorSize;
      }
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      this.marker.x -= _Constants.CursorSize;
      if (this.marker.x < 0) {
        this.marker.x = 0;
      }
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      this.marker.x += _Constants.CursorSize;
      if (this.marker.x > _Constants.WidthLevel) {
        this.marker.x -= _Constants.CursorSize;
      }
    }
  }]);

  return MainView;
}(Phaser.State);

exports.default = MainView;

},{"../Constants.js":1,"../ConstantsKey.js":2,"objects/Character":4,"objects/Controls":5,"objects/InformationString":6,"objects/MapManager":7}]},{},[3])
//# sourceMappingURL=game.js.map
