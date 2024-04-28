import {memo,useEffect,useRef,useState} from 'react';
import initGame from './game';

function App () {
    const phaserRef = useRef();
    const [game, setGame] = useState(null);

    useEffect(() => {
        const game = initGame(phaserRef.current);
        setGame(game);
    },[]);

    return (
        <div className="app">
            <div ref={phaserRef} />
            <div className="app_controls">
                <button onClick={() => game.scene.pause('Game')}>Pause</button>
                <button onClick={() => game.scene.resume('Game')}>Resume</button>
            </div>
        </div>
    )
}

export default memo(App);
