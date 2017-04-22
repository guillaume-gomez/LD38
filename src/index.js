import MainView from 'states/MainView';
import { Width, Height } from  "./Constants.js"

class Game extends Phaser.Game {

  constructor() {
    super(Width, Height, Phaser.AUTO, 'content', null);
    this.state.add('MainView', MainView, false);
    this.state.start('MainView');
    this.currentLevel = 1;
  }

  reset() {
    this.state.start('MainView', Phaser.Plugin.StateTransition.In.ScaleUp, Phaser.Plugin.StateTransition.Out.SlideBottom, true, true, this.currentLevel);
  }

  nextLevel() {
    this.currentLevel++;
    this.state.start('MainView', Phaser.Plugin.StateTransition.In.SlideLeft, null, true, true, this.currentLevel);
  }
  // goToMainGame(params = null) {
  //   this.state.start('MainView', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.Out.SlideLeft, true, true, params);
  // }

  // goToSecondLevel(params = null) {
  //   this.state.start('LeftView', Phaser.Plugin.StateTransition.Out.SlideRight, Phaser.Plugin.StateTransition.Out.SlideRight, true, true, params);
  // }


}

new Game();
