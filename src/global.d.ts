declare global {
    interface Window {
        electron: {
            saveData: (data: any) => Promise<any>;
            openFileDialog: () => Promise<any>;
        };
    }
}

// This is needed for the module to be recognized globally
export {};
