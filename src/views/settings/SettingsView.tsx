import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useEffect, useState} from "react";
import {loadUserData} from "../../actions/userActions.ts";
import {loadTaskData} from "../../actions/taskActions.ts";
import {loadHideoutData} from "../../actions/hideoutActions.ts";
import {loadItemsData} from "../../actions/itemsActions.ts";

import '@styles/views/settings/settings.css';
import '@styles/buttons/setting_btn.css';
import {UserState, UserTasksState} from "@customTypes/types.ts";
import {HideoutUserData} from "@customTypes/hideout.ts";
import {ItemsNeededState} from "@customTypes/items.ts";

const SettingsView = () => {
    const dispatch = useDispatch();

    const profileData = useSelector((root: RootState) => root.user);
    const hideoutData = useSelector((root: RootState) => root.hideout.userStationData);
    const taskData = useSelector((root: RootState) => root.tasks);
    const itemsData = useSelector((root: RootState) => root.itemsNeeded);

    const combinedData = {
        profileData,
        hideoutData,
        taskData,
        itemsData
    }

    interface importData{
        profileData: UserState,
        hideoutData: HideoutUserData[],
        taskData: UserTasksState,
        itemsData: ItemsNeededState
    }

    const [importedData, setImportedData] = useState<importData | null>(null);

    const handleSave = async () => {
        try {
            const response = await window.electron.saveData(combinedData);
            console.log(response.message);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleImport = async () => {
        try {
            // Call openFileDialog to open the file dialog from the main process
            const filePath = await window.electron.openFileDialog();

            // Check if a file was selected
            if (filePath) {
                // Read the selected file using FileReader
                const file = await fetch(filePath);  // Fetch the file content as a response
                const fileText = await file.text();  // Get the text content of the file

                // Parse the JSON data from the file
                const jsonData = JSON.parse(fileText);
                setImportedData(jsonData);
                console.log("Imported data:", jsonData);
            } else {
                console.log("No file selected");
            }
        } catch (error) {
            console.error("Error importing data:", error);
        }
    };


    useEffect(() => {
        if (!importedData) return;

        const profileData = importedData.profileData;
        const hideoutData = importedData.hideoutData;
        const taskData = importedData.taskData;
        const itemData = importedData.itemsData;

        // Dispatch to update user data
        console.log("User data: ", profileData.userLevel);
        if(!Number.isInteger(profileData.userLevel) || profileData.userLevel < 1 || profileData.userLevel > 79){
            console.log("User level is not valid...");
            return;
        }
        dispatch(loadUserData(profileData));

        // Dispatch to update hideout data
        console.log("Hideout data: ", hideoutData);
        dispatch(loadHideoutData(hideoutData));

        // Dispatch to update task data
        console.log("Task data: ", taskData);
        dispatch(loadTaskData(taskData));

        // Dispatch to update item data
        console.log("Item data: ", itemData);
        dispatch(loadItemsData(itemData));

    }, [importedData]);

    return (
        <div className={'view-content'}>
            <div id={'content-container'}>
                <div className={'data-controls'}>
                    <h2>Import / Export Data</h2>
                    <div className={'data-control-buttons'}>
                        <button onClick={handleSave} className={"setting-btn"}>Export JSON</button>
                        {/*<input*/}
                        {/*    type="file"*/}
                        {/*    accept=".json"*/}
                        {/*    onChange={handleImport}*/}
                        {/*    style={{display: 'none'}}*/}
                        {/*    id="file-input"*/}
                        {/*/>*/}
                        <button
                            onClick={handleImport}
                            className="setting-btn"
                        >
                            Load JSON
                        </button>
                    </div>
                    {importedData && (
                        <div>
                            <h3>Data saved to /saves folder</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsView;