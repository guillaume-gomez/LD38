import { BackgroundColor } from "../Constants.js";

class Commands extends Phaser.State {

  create() {
    this.game.stage.setBackgroundColor(BackgroundColor);
    const moveText =  "Arrows keys/ Left Pad";
    const aimText = "Mouse cursor / A, Q, S, D keys";
    const redoText = "Left mouse button / Spacebar";
    const eraseLayer =  "B key";

    this.game.add.text(350, 50, "Commands", { font: "bold 52px Arial", fill: "#8cc169", stroke: '#4D4D4D',strokeThickness: 1 });

    this.game.add.text(150, 200, "Move", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 200, moveText, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 275, "Aim", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 275, aimText, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 350, "Erase Layer", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 350, eraseLayer, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(150, 425, "Rollback Layer", { font: "bold 32px Arial", fill: "#fff" });
    this.game.add.text(500, 425, redoText, { font: "bold 32px Arial", fill: "#fff" });

    this.game.add.text(350, 525, "Press enter to start", { font: "bold 34px Arial", fill: "#fff" });

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
