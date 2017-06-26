import { BackgroundColor, TextColor } from "../Constants.js";
import Controls from "objects/Controls";

class MainMenu extends Phaser.State {

  create() {
    if(this.game.controls.hasGamepad()) {
      this.buttonA = this.game.controls.pad.getButton(Phaser.Gamepad.XBOX360_A);
      this.buttonA.onDown.add(this.next, this);
    }
    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.enterButton.onDown.add(this.next, this);

    this.game.stage.setBackgroundColor(BackgroundColor);
    this.game.add.sprite(20,500, "LD");
    this.game.add.sprite(0,0, "background");
    this.game.add.text(350, 400, "Press enter to start", { font: "bold 34px Arial", fill: TextColor });
    this.game.add.text(700, 530, "Thanks for playing ! :)", { font: "bold 19px Arial", fill: TextColor })
  }

  init() {
    if(!this.game.controls) {
      let controls = new Controls(this.game);
      controls.PostMortemDefaultConfig();
      this.game.controls = controls;
    }
  }

  preload() {
    this.game.load.image("LD", "res/LD.png");
    this.game.load.image("background", "res/menu.png");
  }

  next() {
    if(this.buttonA) {
      this.buttonA.onDown = new Phaser.Signal();
    }
    this.game.goToCommands();
  }

}

export default MainMenu;
