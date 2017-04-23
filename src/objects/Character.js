import { HeroRatio } from "../Constants.js";
const LimitY = 550;
const TimeLapse = 10;

class Character extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    //Enable physics on the player
    game.physics.arcade.enable(this);
    this.body.bounce.x = this.body.bounce.y = 0;
    this.cursor = game.input.keyboard.createCursorKeys();
    this.locked = false;
    const fn = () => {this.body.gravity.y = 750;};
    setTimeout(fn, 500);
    const leftArray = [0,1,2,3,4,5,6,8,9,10,11,12,13,14,15];
    const rightArray = [31, 30, 29, 28, 27, 26, 25, 24,23,22,21,20,19, 18,17,16];
    const JumpArray = [64,65,66];
    this.scale.setTo(HeroRatio, HeroRatio);

    this.animations.add('jump', JumpArray, TimeLapse, true);
    this.animations.add('left', rightArray, TimeLapse, true);
    this.animations.add('right', leftArray, TimeLapse, true);
    this.direction = 1;
  }

  update() {
    if(this.locked) {
      this.body.velocity.x = 0;
      return;
    }

    if (this.cursor.left.isDown) {
        this.body.velocity.x = -200;
        this.animations.play("left", TimeLapse);
        this.direction = -1;
    }
    else if (this.cursor.right.isDown) {
        this.body.velocity.x = 200;
        this.animations.play("right", TimeLapse);
        this.direction = 1;
    } else {
      this.body.velocity.x = 0;
    }

    // Make the player jump if he is touching the ground
    if (this.cursor.up.isDown && this.body.onFloor()) {
      this.body.velocity.y = -225;
      if(this.body.velocity.x === 0) {
        this.animations.play("jump", TimeLapse);
      }
    }

    if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
      this.animations.stop();
      this.frame = this.direction ===  1 ? 0 : 29;
    }
  }

  isDeath() {
    if (!this.body) {
      return false;
    }
    return this.body.position.y > LimitY;
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }
}

export default Character;