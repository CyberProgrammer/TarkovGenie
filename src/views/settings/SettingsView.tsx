import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useEffect, useState} from "react";
import {loadUserData} from "../../actions/userActions.ts";
import {loadTaskData} from "../../actions/taskActions.ts";
import {loadHideoutData} from "../../actions/hideoutActions.ts";
import {loadItemsData} from "../../actions/itemsActions.ts";

import '@styles/views/settings/settings.css';
import '@styles/buttons/setting_btn.css';

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

    const [importedData, setImportedData] = useState(null);

    const handleExport = () => {
        // Convert JSON data to a string
        const jsonData = JSON.stringify(combinedData, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json'; // Filename for the downloaded file

        // Append the link to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the URL
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Event handler when the file is read
            reader.onload = () => {
                try {
                    const jsonData = JSON.parse(reader.result);
                    setImportedData(jsonData);
                    console.log('Imported data:', jsonData); // Do something with the data
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };

            // Read the file as text (JSON)
            reader.readAsText(file);
        }
    };

    useEffect(() => {
        if(importedData == null)
            return;

        const userData= importedData.profileData;
        const hideoutData = importedData.hideoutData;
        const taskData = importedData.taskData;
        const itemData = importedData.itemsData;

        // Dispatch to update user data
        console.log("User data: ", userData);
        if(!Number.isInteger(userData.userLevel) || userData < 1 || userData < 79){
            console.log("User level is not valid...");
            return;
        }
        dispatch(loadUserData(userData));

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
                        <button onClick={handleExport} className={"setting-btn"}>Export JSON</button>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            style={{display: 'none'}}
                            id="file-input"
                        />
                        <button onClick={() => document.getElementById('file-input').click()} className={"setting-btn"}>
                            Load JSON
                        </button>
                    </div>
                    {importedData && (
                        <div>
                            <h3>Data imported!</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsView;