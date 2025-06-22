export interface AppStateProps {
    appState: AppState
    update: React.Dispatch<React.SetStateAction<AppState>>;
};

export class AppState {
    currentDate: Date;
    version: string;
    count: number;

    constructor() {
        this.currentDate = new Date();
        this.version = '0.0.0'; // Initialize version variable
        this.count = 0;
    }
};