import Phaser from 'phaser';
import Game from './scenes/Game';

const initializeGame = el => {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Game],
        parent: el,
        backgroundColor: '#18216D',
    };

    return new Phaser.Game(config);
};

export default initializeGame;
