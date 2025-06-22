// AppContext.tsx
import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

// 1. Define the shape of your context value
interface AppContextType {
    count: number;
    increment: (val: number) => void;
    reset: () => void;
    message: string;
    setMessage: (msg: string) => void;
    currentDate: Date;
    setDate: (date: Date) => void;
}

// 2. Create the Context object
// Provide a default value that matches AppContextType.
// This default value is used when a component consumes the context
// without a matching Provider above it in the tree.
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Create the Provider component
interface AppProviderProps {
    children: ReactNode; // ReactNode type for children prop
}


export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("Hello from AppContext!");
    const [currentDate, setCurrentDate] = useState(new Date());

    let version = '0.0.0'; // Initialize version variable
    let index = 0;

    const increment = (val = 1) => setCount(prevCount => prevCount + val);
    const reset = () => setCount(0);
    // The value that will be provided to consuming components
    const contextValue: AppContextType = {
        count,
        increment,
        reset,
        message,
        setMessage,
        currentDate,
        setDate: setCurrentDate
    };

    useEffect(() => {
        // Update the date every 50ms for smooth millisecond flip
        const intervalId = setInterval(() => {
            contextValue.setDate(new Date());// Trigger a re-render with the updated appState
            index++;
            if (index % 100 === 0) {
                index = 0; // Reset count every 5 seconds (100 * 50ms)
                fetch('./version.json').then(response => {
                    if (!response.ok) {
                        console.error('Failed to fetch version.json');
                        return;
                    }
                    const contentType = response.headers.get('content-type');

                    if (contentType && contentType.includes('application/json')) {
                        return response.json();
                    }
                    console.error('Response to fetch is not json');
                    return;

                }).then(data => {
                    if (data && data.version) {
                        if (version === '0.0.0') {
                            version = data.version; // Set initial version
                        } else if (data.version !== version) {
                            fetch(window.location.href, {
                                cache: 'no-cache',
                                headers: {
                                    'Cache-Control': 'no-cache'
                                }
                            }).then(() => {
                                window.location.reload();
                            });

                        }
                    }
                });
            }


        }, 50);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// 4. Create a custom Hook for easy consumption (optional but recommended)
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};