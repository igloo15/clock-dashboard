import type { FC } from 'react';
import styles from './TextClock.module.css';

interface TextClockProps {
    label: string;
    time: string;
}

const TextClock: FC<TextClockProps> = ({ label, time }) => {
    return (
        <div className={styles.clockContainer}>
            <div className={styles.clockLabel}>{label}</div>
            <div className={styles.clockDisplay}>{time}</div>
        </div>
    );
};

export default TextClock;