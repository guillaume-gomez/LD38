class MainMenu extends Phaser.State {

  create() {
    this.game.add.sprite(50,100, "LD");
    this.game.add.text(100, 230, "Press enter to start", { font: "bold 34px Arial", fill: "#fff" });
    this.game.add.text(160, 350, "Thanks for playing ! :)", { font: "bold 19px Arial", fill: "#fff" })
    this.game.add.text(10, 400, "Compo during LD36(a week later ok!) in August 2016", { font: "bold 19px Arial", fill: "#fff" });
    this.enterButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  preload() {
    this.game.load.image("LD", "res/LD.png");
  }

  update() {
    if(this.enterButton.isDown) {
      this.game.goToMainGame();
    }
  }

}

export default MainMenu;
