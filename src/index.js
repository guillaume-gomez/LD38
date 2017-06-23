import MainView from 'states/MainView';
import MainMenu from 'states/MainMenu';
import Commands from 'states/Commands';
import Introduction from 'states/Introduction';
import FinalScene from 'states/FinalScene';
import { Width, Height } from  "./Constants.js"

class Game extends Phaser.Game {

  constructor() {
    super(Width, Height, Phaser.AUTO, 'content', null);
    this.currentLevel = 1;
    this.state.add('MainMenu', MainMenu, false);
    this.state.add('Commands', Commands, false);
    this.state.add('Introduction', Introduction, false);
    this.state.add('MainView', MainView, false);
    this.state.add('FinalScene', FinalScene, false);
    this.state.start('MainMenu');
  }

  goToMainGame() {
     this.state.start('MainView');
  }

  goToCommands() {
    this.state.start('Commands');
  }

  goToIndroduction() {
    this.state.start('Introduction');
  }

  goToFinalScene() {
    this.state.start('FinalScene');
  }

  goToMenu() {
    this.state.start('MainMenu');
    this.currentLevel = 1;
  }


  reset() {
    this.state.start('MainView', Phaser.Plugin.StateTransition.In.ScaleUp, Phaser.Plugin.StateTransition.Out.SlideBottom, true, true, this.currentLevel);
  }

  nextLevel() {
    this.currentLevel++;
    this.state.start('MainView', Phaser.Plugin.StateTransition.In.SlideLeft, null, true, true, this.currentLevel);
  }
}

new Game();
