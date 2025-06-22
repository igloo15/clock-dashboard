import { useMemo, type FC } from 'react';
import styles from './ButtonArea.module.css';
import { useAppContext } from '../AppContext';

let fullscreen: boolean = false; // Track fullscreen state
let countUp = false;


const toggleFullscreen = () => {
    if (!fullscreen) {
        console.log("Entering fullscreen mode");
        document.documentElement.requestFullscreen();
    } else {
        console.log("Exiting fullscreen mode");
        document.exitFullscreen();
    }
    fullscreen = !fullscreen;
};

const refreshWindow = () => {
    window.location.reload();
};
const toggleCountUp = () => {
    countUp = !countUp;
}

const ButtonArea: FC = () => {

    const { currentDate, increment, reset } = useAppContext();

    let state = useMemo(() => {
        if (countUp) {
            increment(0.05); // Increment by 50ms
        }
    }, [currentDate]);




    return (
        <div className={styles.buttonArea}>
            <h2>Controls</h2>
            <div className={styles.buttonAreaControls}>
                <button onClick={toggleCountUp}>{!countUp ? 'Start' : 'Stop'} Countup</button>
                <button onClick={reset}>Reset Countup</button>
                <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
                <button onClick={refreshWindow}>Refresh Clocks</button>
            </div>
        </div>

    );
};

export default ButtonArea;