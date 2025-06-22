import type { FC } from 'react';
import styles from './SecondaryClocks.module.css';
import TextClock from './TextClock';
import { useAppContext } from '../AppContext';

const SecondaryClocks: FC = () => {
    // Define timezones and labels
    const { currentDate } = useAppContext();

    const timezones = [
        { label: 'UTC Time', timeZone: 'UTC' },
        { label: 'West Coast (PT)', timeZone: 'America/Los_Angeles' },
        { label: 'Tokyo Time', timeZone: 'Asia/Tokyo' },
    ];

    return (
        <div className={styles.secondaryClocks}>
            {timezones.map(({ label, timeZone }) => {
                const options: Intl.DateTimeFormatOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: timeZone,
                };
                let timeString = '--:--:--';
                try {
                    timeString = new Intl.DateTimeFormat('en-US', options).format(currentDate);
                } catch (e) {
                    console.error(`Error formatting time for ${label}:`, e);
                    timeString = 'Error';
                }


                return (
                    <TextClock
                        key={timeZone} // Use timezone as a unique key
                        label={label}
                        time={timeString}
                    />
                );
            })}
        </div>
    );
};

export default SecondaryClocks;