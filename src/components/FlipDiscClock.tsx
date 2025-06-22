import { type FC, useMemo } from 'react';
import styles from './FlipDiscClock.module.css';
import { GRID_ROWS, GRID_COLS_COUNT_FINAL } from '../ClockConfig';
import type { AppStateProps } from '../AppTypes';
import { useAppContext } from '../AppContext';

interface ClockDigit {
    char?: string;
    numbers: number[][];
}

interface ClockDate {
    digits: ClockDigit[];
    timeString: string;
    numbers: number[][];
}

interface FlipDiscClockProps {
    currentDate: Date;
}

/**
 * Programmatically generates the dot pattern for a single character (0-9, '-', '.')
 * on a specified width x height grid.
 *
 * NOTE: The drawing logic (coordinates) within this function is designed for a specific
 * aspect ratio. If you change `digitWidth` and `digitHeight` significantly,
 * you will need to re-adjust the coordinates for each digit's drawing to look correct.
 * This example provides patterns for a 3x5 grid for '0', '1', '2', '-', '.', and defaults
 * to 5x5 for other digits if called with default dimensions, though they will look incorrect.
 *
 * @param {string} char The character ('0' through '9', '-', '.').
 * @param {number} digitWidth The width of the grid for the character.
 * @param {number} digitHeight The height of the grid for the character.
 * @returns {string[]} An array of strings, where each string is a row of '1's and '0's
 * representing the character's pattern.
 */
function generateCharacterPattern(char: string, digitWidth: number, digitHeight: number, padding: number = 1): number[][] {
    // Initialize an empty grid with '0's based on provided dimensions
    const grid: number[][] = Array(digitHeight).fill(0).map(() => Array(digitWidth).fill(0));

    // Helper function to set a "pixel" to '1'
    const setPixel = (row: number, col: number, value?: number): void => {
        if (row >= 0 && row < digitHeight && col >= 0 && col < digitWidth) {
            grid[row][col] = value ?? 1;
        }
    };

    const setPixelByXY = (x: number, y: number, value?: number): void => {
        setPixel(y, x, value);
    };
    // Helper function to draw a straight line segment (horizontal or vertical)
    const drawLine = (x1: number, y1: number, x2: number, y2: number): void => {
        if (x1 === x2) { // Vertical line
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                setPixel(y, x1);
            }
        } else if (y1 === y2) { // Horizontal line
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
                setPixel(y1, x);
            }
        } else {
            // For simple dot-matrix style, just plot endpoints for diagonals
            setPixel(y1, x1);
            setPixel(y2, x2);
        }
    };

    // --- Drawing logic tailored for a 3x5 grid ---
    // (column, row) coordinates
    let midPoint = Math.floor(digitWidth / 2);
    let midPointHeight = Math.floor(digitHeight / 2);
    switch (char) {
        case '0':
            // Represents a "rounded" 0 for 3x5
            drawLine(0, 0, 0, digitHeight - 1);
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1); // Top line
            drawLine(digitWidth - 1, 0, digitWidth - 1, digitHeight - 1); // Bottom line
            setPixelByXY(0, 0, 0);
            setPixelByXY(0, digitHeight - 1, 0);
            setPixelByXY(digitWidth - 1, 0, 0);
            setPixelByXY(digitWidth - 1, digitHeight - 1, 0);
            break;
        case '1':
            // Simple 1 for 3x5
            setPixelByXY(midPoint, 0); // Top tip
            drawLine(midPoint, 0, midPoint, digitHeight - 1); // Main vertical line
            setPixelByXY(midPoint - 1, digitHeight - 1); // Base left
            setPixelByXY(midPoint + 1, digitHeight - 1);
            setPixelByXY(midPoint - 1, 1); // Base
            break;
        case '2':
            // Simple 2 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(digitWidth - 1, 0, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, 0, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            break;
        case '3':
            // Simple 3 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(digitWidth - 1, 0, digitWidth - 1, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            drawLine(1, midPointHeight, digitWidth - 1, midPointHeight);
            break;
        case '4':
            // Simple 4 for 3x5
            drawLine(0, 0, 0, midPointHeight);
            drawLine(digitWidth - 1, 0, digitWidth - 1, digitHeight - 1);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            break;
        case '5':
            // Simple 5 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(0, 0, 0, midPointHeight);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            drawLine(digitWidth - 1, midPointHeight, digitWidth - 1, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            break;
        case '6':
            // Simple 6 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(0, 0, 0, midPointHeight);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, 0, digitHeight - 1);
            drawLine(digitWidth - 1, midPointHeight, digitWidth - 1, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            break;
        case '7':
            // Simple 7 for 3x5

            drawLine(0, 0, digitWidth - 1, 0);
            setPixelByXY(digitWidth - 1, 1, 1); // Top right corner
            //setPixelByXY(digitWidth - 1, 2, 1); // Top right corner
            let x = digitWidth - 1;
            for (let y = 2; y < digitHeight; y++) {
                if (x > 0) {
                    drawLine(x, y, x - 1, y);
                } else {
                    setPixelByXY(x, y, 1); // Draw the vertical line down
                }
                x -= 1; // Move left
            }
            break;
        case '8':
            // Simple 8 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(0, 0, 0, midPointHeight);
            drawLine(digitWidth - 1, 0, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, 0, digitHeight - 1);
            drawLine(digitWidth - 1, midPointHeight, digitWidth - 1, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            break;
        case '9':
            // Simple 9 for 3x5
            drawLine(0, 0, digitWidth - 1, 0);
            drawLine(0, 0, 0, midPointHeight);
            drawLine(digitWidth - 1, 0, digitWidth - 1, midPointHeight);
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight);
            drawLine(digitWidth - 1, midPointHeight, digitWidth - 1, digitHeight - 1);
            drawLine(0, digitHeight - 1, digitWidth - 1, digitHeight - 1);
            break;
        case '-': // Just a middle line for 3x5
            drawLine(0, midPointHeight, digitWidth - 1, midPointHeight); // Middle line
            break;
        case ':': // Two dots, one on top and one on bottom
            setPixelByXY(0, midPointHeight - 1); // Top dot
            setPixelByXY(0, midPointHeight + 1); // Bottom dot
            break;
        case '.': // Just a dot at the bottom-middle for 3x5
            setPixelByXY(midPoint, digitHeight - 1); // Row 4 (last row), Col 1 (middle)
            break;
        default:
            // Return an empty grid (all '0's) for unsupported characters
            return Array(digitHeight).fill([0]);
    }
    let newGrid = concat2DArraysByColumn(Array(digitHeight).fill(Array(padding).fill(0)), grid); // Add empty columns on both sides
    return newGrid; // Convert grid to array of '1'/'0' strings
}

const createConfig = (width: number, height: number): Map<String, number[][]> => {
    const config = new Map<String, number[][]>();

    console.log(generateCharacterPattern('2', width, height));
    config.set("0", generateCharacterPattern('0', width, height));
    config.set("1", generateCharacterPattern('1', width, height));
    config.set("2", generateCharacterPattern('2', width, height));
    config.set("3", generateCharacterPattern('3', width, height));
    config.set("4", generateCharacterPattern('4', width, height));
    config.set("5", generateCharacterPattern('5', width, height));
    config.set("6", generateCharacterPattern('6', width, height));
    config.set("7", generateCharacterPattern('7', width, height));
    config.set("8", generateCharacterPattern('8', width, height));
    config.set("9", generateCharacterPattern('9', width, height));
    config.set(":", generateCharacterPattern(':', 1, height));
    config.set(".", generateCharacterPattern('.', 1, height));

    return config;
}

const timeConfig = createConfig(5, 7);
const msConfig = createConfig(3, 7);


const getDigitPattern = (char: string, config: Map<String, number[][]>): number[][] => {
    // Check if the character is a digit or special character
    if (config.has(char)) {
        return config.get(char) || []; // Return the pattern or an empty array if not found
    } else {
        console.warn(`No pattern found for character: ${char}`);
        return []; // Return an empty array for unsupported characters
    }
}

function concat2DArraysByColumn(
    arr1: number[][],
    arr2: number[][]
): number[][] {
    if (arr1.length !== arr2.length) {
        throw new Error("Cannot concatenate by column: Arrays must have the same number of rows.");
    }

    const result: number[][] = [];
    for (let i = 0; i < arr1.length; i++) {
        // Concatenate the i-th row of arr1 with the i-th row of arr2
        result.push(arr1[i].concat(arr2[i]));
    }
    return result;
}

const createClockDate = (currentDate: Date): ClockDate => {
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Ensure hours are 2 digits
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Ensure minutes are 2 digits
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Ensure seconds are 2 digits
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0'); // Ensure milliseconds are 3 digits

    const digits = [
        { numbers: getDigitPattern(hours[0], timeConfig) },
        { numbers: getDigitPattern(hours[1], timeConfig) },
        { numbers: getDigitPattern(":", timeConfig) },
        { numbers: getDigitPattern(minutes[0], timeConfig) },
        { numbers: getDigitPattern(minutes[1], timeConfig) },
        { numbers: getDigitPattern(":", timeConfig) },
        { numbers: getDigitPattern(seconds[0], timeConfig) },
        { numbers: getDigitPattern(seconds[1], timeConfig) },
        { numbers: getDigitPattern(".", msConfig) }, // Dot before milliseconds
        { numbers: getDigitPattern(milliseconds[0], msConfig) },
        { numbers: getDigitPattern(milliseconds[1], msConfig) },
        { numbers: getDigitPattern(milliseconds[2], msConfig) }
    ];

    let gridData: number[][] = Array(7).fill([0]);
    for (let i = 0; i < digits.length; i++) {
        gridData = concat2DArraysByColumn(gridData || [], digits[i].numbers);
    }

    gridData = gridData.map(row => row.slice(1));
    gridData = concat2DArraysByColumn(gridData, Array(7).fill([0])); // Add empty columns on both sides
    return {
        digits: digits,
        timeString: `${hours}:${minutes}:${seconds}.${milliseconds}`,
        numbers: gridData
    }
}


const FlipDiscClock: FC = () => {

    const { currentDate } = useAppContext();
    // Calculate the grid state whenever currentDate changes
    const gridState = useMemo(() => {
        return createClockDate(currentDate);
    }, [currentDate]); // Recalculate only when currentDate changes


    return (
        <div className={styles.mainClock}>

            <div
                className={styles.flipDotGrid}
                style={{
                    gridTemplateColumns: `repeat(${GRID_COLS_COUNT_FINAL}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                }}
            >
                {/* Render the discs based on the calculated state */}
                {gridState.numbers.map((row, r) =>
                    row.map((shouldBeOn, c) => {
                        // Determine special classes based on position (applied to the cell container)
                        let isColonDot = false;
                        let isMsSegment = false;

                        // Check the grid layout map for the type and height at this column (using c)
                        // for (const [startCol, endCol, type, pWidth, pHeight] of gridLayoutMap) {
                        //     if (pWidth === -1212) continue; // Skip invalid patterns
                        //     // Check if the current column falls within the range of this pattern
                        //     if (c >= startCol && c <= endCol) {
                        //         if (type === 'colon') isColonDot = true;
                        //         // Check if it's a digit that uses the smaller (5-row) pattern OR the dot-space
                        //         if ((type === 'digit' && pHeight === 5) || type === 'dot-space') {
                        //             isMsSegment = true;
                        //         }
                        //         break; // Found the type for this column
                        //     }
                        // }

                        const cellClasses = [styles.dotCell];
                        if (shouldBeOn === 1) cellClasses.push(styles.isOn); // Use isOn from CSS module
                        if (isColonDot) cellClasses.push(styles.colonDot); // Use colonDot from CSS module
                        if (isMsSegment) cellClasses.push(styles.msDot);   // Use msDot from CSS module


                        return (
                            <div key={`${r}-${c}`} className={cellClasses.join(' ')}>
                                <div className={styles.disc}></div>
                            </div>
                        );
                    })
                )}

            </div>
            <div style={{ marginTop: '10px', fontSize: '1em', fontWeight: 'bold' }}>
                {currentDate.toDateString()} - {currentDate.toLocaleTimeString()}
            </div>
        </div>
    );
};

export default FlipDiscClock;