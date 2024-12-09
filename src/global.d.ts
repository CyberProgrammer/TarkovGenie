import {UserState, UserTasksState} from "@customTypes/types.ts";
import {HideoutUserData} from "@customTypes/hideout.ts";
import {ItemsNeededState} from "@customTypes/items.ts";

interface importData{
    profileData: UserState,
    hideoutData: string | HideoutUserData[] | undefined,
    taskData: UserTasksState | object,
    itemsData: ItemsNeededState
}

declare global {
    interface Window {
        electron: {
            saveData: (data: importData) => Promise<importData>;
            openFileDialog: () => Promise<string>;
            readFile: (filePath: string) => Promise<{ success: boolean; data?: string; message?: string }>;
            getProfiles: () => Promise<{ file: string, creationDate: Date }[]>;
            getSaveLocation: () => Promise<string>;
            updateReduxState: (state: importData) => Promise<{success: boolean, message?: string}>;
            deleteSave: (filePath: string) => Promise<{ success: boolean}>;
        };
    }
}

// This is needed for the module to be recognized globally
export {};
