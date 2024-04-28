import Phaser, {Scene} from 'phaser';
import {getRandomLength} from '../utils/random';

const ANIMATION_DURATION = 1000;

class Game extends Scene {
  constructor () {
    super('Game');
  }

  create() {
    this.addInitialLine(0, this.game.config.height, this.game.config.width / 2, this.game.config.height / 2);
  }

  update() {
    if (this.lastLine) {
      this.cameras.main.centerOnX(this.lastLine.x2);
    }
  }

  addInitialLine(x1, y1, x2, y2) {
    const line = new Phaser.Geom.Line(x1, y1, x1, y1);
    const graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xaa00aa
      }
    });
    graphics.strokeLineShape(line);

    this.tweens.add({
      targets: line,
      x2,
      y2,
      duration: ANIMATION_DURATION * (x2 / 100),
      onUpdate: (tween, target) => {
        graphics.clear();
        graphics.strokeLineShape(target);
      },
      onComplete: () => {
        const newLength = getRandomLength(50, 100);
        const newAngle = Phaser.Math.Between(-45, 45);

        this.lastLine = this.addRandomLine(line.x2, line.y2, newLength, newAngle, 'down');
      }
    });
  }

  addRandomLine(x1, y1, length, angle, direction = 'up') {
    let angleInRadians = Math.abs(Phaser.Math.DegToRad(angle));
    angleInRadians = direction === 'down' ? angleInRadians : -angleInRadians;

    const x2 = x1 + length * Math.cos(angleInRadians);
    const y2 = y1 + length * Math.sin(angleInRadians);

    const line = new Phaser.Geom.Line(x1, y1, x1, y1);
    const graphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: 0xaa00aa
      }
    });
    graphics.strokeLineShape(line);

    this.tweens.add({
      targets: line,
      x2,
      y2,
      duration: ANIMATION_DURATION * (length / 100),
      onUpdate: (tween, target) => {
        graphics.clear();
        graphics.strokeLineShape(target);
      },
      onComplete: () => {
        const newLength = getRandomLength(0, 50);
        const newAngle = Phaser.Math.Between(-45, 45);
        const newDirection = direction === 'up' ? 'down' : 'up';

        this.lastLine = this.addRandomLine(x2, y2, newLength, newAngle, newDirection);
      }
    });

    return line;
  }
}

export default Game;
