import { BackgroundColor } from "../Constants.js";

class MainMenu extends Phaser.State {

  create() {
    this.game.stage.setBackgroundColor(BackgroundColor);
    this.game.add.sprite(20,500, "LD");
    this.game.add.sprite(0,0, "background");
    this.game.add.text(350, 50, "Press enter to start", { font: "bold 34px Arial", fill: "#fff" });
    this.game.add.text(700, 530, "Thanks for playing ! :)", { font: "bold 19px Arial", fill: "#fff" })
    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  preload() {
    this.game.load.image("LD", "res/LD.png");
    this.game.load.image("background", "res/menu.png");
  }

  update() {
    if(this.enterButton.isDown) {
      this.game.goToCommands();
    }
  }

}

export default MainMenu;
