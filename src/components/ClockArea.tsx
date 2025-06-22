import type { FC } from 'react';
import styles from './ClockArea.module.css';
import FlipDiscClock from './FlipDiscClock';
import SecondaryClocks from './SecondaryClocks';
import { useAppContext } from '../AppContext';

const ClockArea: FC = () => {
    const { count } = useAppContext();
    return (
        <div className={styles.clockArea}>
            {/* H1 is global, moved to global.css or could be here */}
            {/* <h1>World Clocks</h1> // Removed as it's in global now */}
            <FlipDiscClock />
            <SecondaryClocks />
            <div>
                {Math.round(count)} seconds since start
            </div>
        </div>
    );
};

export default ClockArea;