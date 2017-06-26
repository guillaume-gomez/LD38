import { BackgroundColor, TextColor } from "../Constants.js";
import Controls from "../objects/Controls";

const RatioButton = 0.75;

class Commands extends Phaser.State {

  create() {
    this.game.stage.setBackgroundColor(BackgroundColor);
    const aimText = "Mouse cursor / Arrow keys";
    const eraseLayer =  "Spacebar";

    let group = this.game.add.group();
    const button = this.game.make.button(800, 20, 'button', this.switchKeyboard, this, 2, 1, 0);
    this.textInfo = this.game.add.text(870, 90, "Qwerty", { font: "bold 14px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });
    group.add(button);

    this.moveText = this.game.add.text(500, 125, "", { font: "bold 32px Arial", fill: TextColor });
    this.jumpText = this.game.add.text(500, 200, "", { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(350, 25, "Commands", { font: "bold 52px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });

    this.game.add.text(50, 125, "Move", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(50, 200, "Jump", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(50, 275, "Aim", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(50, 350, "Swith to inner layer", { font: "bold 32px Arial", fill: TextColor });
    this.game.add.text(50, 425, "Rollback to previous layer", { font: "bold 32px Arial", fill: TextColor });

    this.game.add.text(350, 525, "Press enter to start", { font: "bold 34px Arial", fill: TextColor });

    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.gamepad.start();

    let controls = new Controls(this.game);
    controls.PostMortemDefaultConfig();
    this.game.controls = controls;

    if(this.game.controls.hasGamepad()) {
      this.buttonA = this.game.controls.pad.getButton(Phaser.Gamepad.XBOX360_A);
      this.buttonA.onDown.add(this.nextStep, this);

      let imageA = this.game.add.image(490, 185, 'xbox360', '360_A');
      imageA.scale.setTo(RatioButton, RatioButton);
      let imageB = this.game.add.image(490, 335, 'xbox360', '360_B');
      imageB.scale.setTo(RatioButton, RatioButton);
      let imageX = this.game.add.image(490, 410, 'xbox360', '360_X');
      imageX.scale.setTo(RatioButton, RatioButton);
      let imageLeft = this.game.add.image(490, 260, 'xbox360', '360_Left_Stick');
      imageLeft.scale.setTo(RatioButton, RatioButton);
      let imageRight = this.game.add.image(490, 110, 'xbox360', '360_Right_Stick');
      imageRight.scale.setTo(RatioButton, RatioButton);

      group.alpha = 0;
      this.textInfo.alpha = 0;
    } else {
      this.game.add.text(500, 275, aimText, { font: "bold 32px Arial", fill: TextColor });
      this.game.add.text(500, 350, eraseLayer, { font: "bold 32px Arial", fill: TextColor });
      this.game.add.text(500, 425, "Shift", { font: "bold 32px Arial", fill: TextColor });
    }
  }

  nextStep() {
    if(this.buttonA) {
      this.buttonA.onDown = new Phaser.Signal();
    }
    this.game.goToIndroduction();
  }

  update() {
    if(this.enterButton.isDown) {
      this.game.goToIndroduction();
    }
    if(!this.game.controls.hasGamepad()) {
      if(this.game.controls.isQwerty) {
        this.moveText.setText("A / D keys");
        this.jumpText.setText("W key");
      } else {
        this.moveText.setText("Q / D keys");
        this.jumpText.setText("Z key");
      }
    }
  }

  preload() {
    this.game.load.spritesheet('button', "res/button_sprite_sheet.png", 193, 71);
    this.game.load.atlas('xbox360', 'res/xbox360.png', 'res/xbox360.json');
  }

  switchKeyboard() {
    this.game.controls.toggleKeyboardType();
    const text = this.game.controls.isQwerty ? "Qwerty" : "Azerty";
    this.textInfo.setText(text);
  }

}

export default Commands;
