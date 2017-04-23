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
    this.keyRemoveLayer = game.input.keyboard.addKey(Phaser.Keyboard.Z);

    this.locked = false;
    const fn = () => {this.body.gravity.y = 750;};
    setTimeout(fn, 1000);
    const leftArray = [0,1,2,3,4,5,6,8,9,10,11,12,13,14,15];
    const rightArray = [31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16];
    const JumpArrayRight = [64,65,66];
    const JumpArrayLeft = [80, 81,82];
    const PowerLeft = [48];
    const PowerRight = [32];
    const IdleRight = [96,97,98,99,100,101,102,103,104,105,106,107,108, 109, 110];
    const IdleLeft = [128,129,130,131, 132,133,134,135,136,137,138,139,140,141,142];
    this.scale.setTo(HeroRatio, HeroRatio);

    this.animations.add('jumpLeft', JumpArrayLeft, TimeLapse, true);
    this.animations.add('jumpRight', JumpArrayRight, TimeLapse, true);
    this.animations.add('left', rightArray, TimeLapse, true);
    this.animations.add('right', leftArray, TimeLapse, true);
    this.animations.add('powerLeft', PowerLeft, TimeLapse, true);
    this.animations.add('powerRight', PowerRight, TimeLapse, true);
    this.animations.add('idleRight', IdleRight, TimeLapse, true);
    this.animations.add('idleLeft', IdleLeft, TimeLapse, true);
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
        if(this.direction === -1) {
          this.animations.play("jumpLeft", TimeLapse);
        } else {
          this.animations.play("jumpRight", TimeLapse);
        }
      }
    }

    if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
      if (this.direction == -1) {
        this.animations.play("idleLeft", TimeLapse);
      } else {
        this.animations.play("idleRight", TimeLapse);
      }
      //this.frame = this.direction ===  1 ? 0 : 29;
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

  eraseBlocksAnimation(cursor) {
    if(this.x < cursor.x) {
      this.frame = 32;
      this.direction = 1;
      //this.animations.play('powerLeft', TimeLapse);
    } else {
      this.frame = 48;
      this.direction = -1;
      //this.animations.play('powerRight', TimeLapse);
    }
  }
}

export default Character;