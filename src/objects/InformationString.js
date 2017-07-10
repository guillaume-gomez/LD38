import { TextPosition , Style, Height, WidthLevel } from '../Constants.js';

const Timer = 9000;

class InformationString extends Phaser.Text {

  constructor(game, x, text, timer = Timer) {
    super(game, x, TextPosition, text, Style);
    game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    this.anchor.set(0.5);
    this.visible = false;
    this.timer = timer;

    if(text.length !== 0) {
      this.bar = game.add.graphics();
      this.bar.beginFill(0x000000, 0.2);
      this.bar.drawRect(0, 0, WidthLevel, 80);
    }
  }

  blink() {
    const fn = () => {
      this.visible  = false;
      if(this.bar) this.bar.destroy();
    };
    setTimeout(fn, this.timer);
    this.visible = true;
  }

}

export default InformationString;