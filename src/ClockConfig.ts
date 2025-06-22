// --- Configuration ---
export const GRID_ROWS = 7;
// H1(4)+H2(4) + Sp(2) + Col(3) + Sp(2) + M1(4)+M2(4) + Sp(2) + Col(3) + Sp(2) + S1(4)+S2(4) + Sp/Dot(2) + ms1(3)+ms2(3)+ms3(3) = 49 columns
export const GRID_COLS_COUNT_FINAL = 55;

// Patterns for digits (4x6 for time, 3x5 for milliseconds) - flattened arrays
// Add export keyword
export const timeDigitPatterns: { [key: string]: number[] } = {
    '0': [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 4x6
    '1': [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // 4x6
    '2': [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1], // 4x6
    '3': [1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 4x6
    '4': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // 4x6
    '5': [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1], // 4x6
    '6': [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 4x6
    '7': [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // 4x6
    '8': [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1], // 4x6
    '9': [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1], // 4x6
};

export const msDigitPatterns: { [key: string]: number[] } = {
    '0': [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], // 3x5
    '1': [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // 3x5
    '2': [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], // 3x5
    '3': [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 3x5
    '4': [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], // 3x5
    '5': [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 3x5
    '6': [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 3x5
    '7': [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0], // 3x5
    '8': [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // 3x5
    '9': [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], // 3x5
};


// Mapping grid column ranges to character type, pattern size, and position within value string
// [start_col, end_col, char_type, pattern_width, pattern_height, string_source ('time' or 'ms'), string_index]
// Add export keyword and type
export const gridLayoutMap: [number, number, string, number, number, string?, number?][] = [
    [0, 3, 'digit', 4, 6, 'time', 0],   // HH Tens (4 cols)
    [4, 7, 'digit', 4, 6, 'time', 1],   // HH Units (4 cols)
    [8, 9, 'space', 2, 6],             // Space between HH and Colon (2 cols)
    [10, 12, 'colon', 3, 6],           // Colon 1 (3 cols)
    [13, 14, 'space', 2, 6],           // Space between Colon and MM (2 cols)
    [15, 18, 'digit', 4, 6, 'time', 2], // MM Tens (4 cols)
    [19, 22, 'digit', 4, 6, 'time', 3], // MM Units (4 cols)
    [23, 24, 'space', 2, 6],           // Space between MM and Colon (2 cols)
    [25, 27, 'colon', 3, 6],           // Colon 2 (3 cols)
    [28, 29, 'space', 2, 6],           // Space between Colon and SS (2 cols)
    [30, 33, 'digit', 4, 6, 'time', 4], // SS Tens (4 cols)
    [34, 37, 'digit', 4, 6, 'time', 5], // SS Units (4 cols)
    [38, 39, 'dot-space', 2, 6],       // Space/Dot before MS area (2 cols). Dot will appear only at ms row level.
    [40, 42, 'digit', 3, 5, 'ms', 0],  // MS Hundreds (3 cols)
    [43, 45, 'digit', 3, 5, 'ms', 1],  // MS Tens (3 cols)
    [46, 48, 'digit', 3, 5, 'ms', 2],  // MS Units (3 cols)
];

