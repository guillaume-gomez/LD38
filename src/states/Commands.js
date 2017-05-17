import { BackgroundColor, TextColor } from "../Constants.js";
import Controls from "../objects/Controls";

class Commands extends Phaser.State {

  create() {
    this.game.stage.setBackgroundColor(BackgroundColor);
    const aimText = "Mouse cursor / Arrow keys";
    const eraseLayer =  "Spacebar";

    let group = this.game.add.group();
    const button = this.game.make.button(800, 20, 'button', this.switchKeyboard, this, 2, 1, 0);
    this.textInfo = this.game.add.text(870, 90, "Qwerty", { font: "bold 14px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });
    group.add(button);

    this.game.add.text(350, 25, "Commands", { font: "bold 52px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });

    this.game.add.text(50, 125, "Move", { font: "bold 32px Arial", fill: TextColor });
    this.moveText = this.game.add.text(500, 125, "", { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(50, 200, "Jump", { font: "bold 32px Arial", fill: TextColor });
    this.jumpText = this.game.add.text(500, 200, "", { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(50, 275, "Aim", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(500, 275, aimText, { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(50, 350, "Swith to inner layer", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(500, 350, eraseLayer, { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(50, 425, "Rollback to previous layer", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(500, 425, "Shift", { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(350, 525, "Press enter to start", { font: "bold 34px Arial", fill: TextColor });

    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.gamepad.start();

    let controls = new Controls();
    controls.PostMortemDefaultConfig();
    this.game.controls = controls;
  }

  update() {
    if(this.enterButton.isDown) {
      this.game.goToMainGame();
    }

    if(this.game.controls.isQwerty) {
      this.moveText.setText("A / D keys");
      this.jumpText.setText("W key");
    } else {
      this.moveText.setText("Q / D keys");
      this.jumpText.setText("Z key");
    }
  }

  preload() {
    this.game.load.spritesheet('button', "res/button_sprite_sheet.png", 193, 71);
  }

  switchKeyboard() {
    this.game.controls.toggleKeyboardType();
    const text = this.game.controls.isQwerty ? "Qwerty" : "Azerty";
    this.textInfo.setText(text);
  }

}

export default Commands;
