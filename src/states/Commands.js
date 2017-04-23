import { BackgroundColor } from "../Constants.js";

class Commands extends Phaser.State {

  create() {
    this.game.stage.setBackgroundColor(BackgroundColor);
    const moveText =  "Arrows keys/ Left Pad";
    const aimText = "Mouse cursor / A, Q, S, D";
    const redoText = "Left mouse button / B key";
    const eraseLayer =  "Right mouse button / Spacebar";

    this.game.add.text(350, 80, "Commands", { font: "bold 52px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });

    this.game.add.text(150, 225, "Move", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 225, moveText, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 300, "Aim", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 300, aimText, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 375, "Erase Layer", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 375, eraseLayer, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 450, "Redo Layer", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 450, redoText, { font: "bold 32px Arial", fill: "#fff" });

    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.game.input.gamepad.start();
  }

  update() {
    if(this.enterButton.isDown) {
      this.game.goToMainGame();
    }
  }

}

export default Commands;
