const Actions = ["left", "right", "jump", "moveLeftCursor", "moveRightCursor", "moveDownCursor", "moveUpCursor", "undoLayer", "removeLayer"];

class Controls {
  constructor(game, controlsSettings = {}, actionList = Actions) {
    this.game = game;
    this.controlsSettings = controlsSettings;
    this.actionList = actionList;
    this.isQwerty = true;
    this.game.input.gamepad.start();
    this.pad = this.game.input.gamepad.pad1;
    this.isMovingRightPad = false;
  };

  getKey(action) {
    if(!this.controlsSettings[action]) {
      console.error(`cannot find ${action} in the action list`);
    }
    return this.controlsSettings[action];
  }

  addControls(params) {
    Object.keys(params).forEach(action => this.addControl(params[action], action));
  }

  qwertyKeyboard() {
    return {
      "left" : Phaser.Keyboard.A,
      "right" : Phaser.Keyboard.D,
      "jump" : Phaser.Keyboard.W,
      "undoLayer" : Phaser.Keyboard.SPACEBAR,
      "removeLayer" : Phaser.Keyboard.SHIFT
    }
  }

  azertyKeyBoard() {
    return {
      "left" : Phaser.Keyboard.Q,
      "right" : Phaser.Keyboard.D,
      "jump" : Phaser.Keyboard.Z,
      "undoLayer" : Phaser.Keyboard.SPACEBAR,
      "removeLayer" : Phaser.Keyboard.SHIFT
    }
  }

  padConfig() {
    return {
      "jump" : Phaser.Gamepad.XBOX360_A,
      "undoLayer" : Phaser.Gamepad.XBOX360_X,
      "removeLayer" : Phaser.Gamepad.XBOX360_B,

    }
  }

  injectPropsDueToKeyboardType() {
    if(!this.isQwerty) {
      return this.azertyKeyBoard();
    }
    return this.qwertyKeyboard();
  }

  defaultConfig() {
    const defaultConfigParams = {
        "moveLeftCursor" : Phaser.Keyboard.A,
        "moveRightCursor" : Phaser.Keyboard.D,
        "moveDownCursor": Phaser.Keyboard.S,
        "moveUpCursor" : Phaser.Keyboard.W,
      };
      this.addControls(defaultConfigParams);
  }

  PostMortemDefaultConfig() {
    let defaultConfigParams = {
        "moveLeftCursor" : Phaser.Keyboard.LEFT,
        "moveRightCursor" : Phaser.Keyboard.RIGHT,
        "moveDownCursor": Phaser.Keyboard.DOWN,
        "moveUpCursor" : Phaser.Keyboard.UP,
      };

      defaultConfigParams = Object.assign({}, defaultConfigParams, this.injectPropsDueToKeyboardType());
      this.addControls(defaultConfigParams);
  }

  // // { {ref: pointer, action: left key: Z}}
  // setUpControl(params) {

  //   this.keyUndoLayer = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
  //   this.keyUndoLayer.onDown.add(this.undoBlockKeyboard, this);
  // }

  addControl(key, action) {
    if(!this.actionList.includes(action)) {
      console.error(`the action named '${action}' does not exist`);
    }
    this.controlsSettings[action] = key;
  }

  toggleKeyboardType() {
    this.isQwerty = !this.isQwerty;
    this.PostMortemDefaultConfig();
  }

  export() {
    return this.controlsSettings;
  }

  delayControl(timer) {
    const fn = () => { this.isMovingRightPad = false};
    setTimeout(fn, timer);
  }


  hasGamepad() {
    return this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.input.gamepad.pad1.connected;
  }

}
export default Controls;