import { TextPosition , Style, Height } from '../Constants.js';

const Timer = 5000;

class InformationString extends Phaser.Text {

  constructor(game, x, text, timer = Timer) {
    super(game, x, TextPosition.y, text, Style);
    game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
    this.setShadow(1, 1, 'rgba(0,0,0,0.7)', 1);
    this.setTextBounds(TextPosition.x0, TextPosition.y0, TextPosition.x1, TextPosition.y1);
    this.visible = false;
    this.timer = timer;
  }

  blink() {
    const fn = () => {this.visible  = false};
    setTimeout(fn, this.timer);
    this.visible = true;
  }

}

export default InformationString;