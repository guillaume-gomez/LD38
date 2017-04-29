const Actions = ["left", "right", "jump", "moveLeftCursor", "moveRightCursor", "moveDownCursor", "moveUpCursor", "undoLayer", "removeLayer"];

class Controls {
  constructor(controlsSettings = {}, actionList = Actions) {
    this.controlsSettings = controlsSettings;
    this.actionList = actionList;
    this.isQwerty = true;
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
    }
  }

  azertyKeyBoard() {
    return {
      "left" : Phaser.Keyboard.Q,
      "right" : Phaser.Keyboard.D,
      "jump" : Phaser.Keyboard.Z,
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
        "left" : Phaser.Keyboard.A,
        "right" : Phaser.Keyboard.A,
        "jump" : Phaser.Keyboard.A,
        "moveLeftCursor" : Phaser.Keyboard.A,
        "moveRightCursor" : Phaser.Keyboard.D,
        "moveDownCursor": Phaser.Keyboard.S,
        "moveUpCursor" : Phaser.Keyboard.W,
        "undoLayer" : Phaser.Keyboard.SPACEBAR,
        "removeLayer" : Phaser.Keyboard.B
      };
      this.addControls(defaultConfigParams);
  }

  PostMortemDefaultConfig() {
    let defaultConfigParams = {
        "left" : Phaser.Keyboard.Q,
        "right" : Phaser.Keyboard.D,
        "jump" : Phaser.Keyboard.Z,
        "moveLeftCursor" : Phaser.Keyboard.LEFT,
        "moveRightCursor" : Phaser.Keyboard.RIGHT,
        "moveDownCursor": Phaser.Keyboard.DOWN,
        "moveUpCursor" : Phaser.Keyboard.UP,
        "undoLayer" : Phaser.Keyboard.A,
        "removeLayer" : Phaser.Keyboard.E
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

  export() {
    return this.controlsSettings;
  }



}
export default Controls;