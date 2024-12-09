import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useEffect, useState} from "react";
import {modifyUsername} from "../../actions/userActions.ts";

import '@styles/views/settings/settings.css';
import '@styles/buttons/setting_btn.css';
import {importData} from "@customTypes/types.ts";
import loadDataDispatch from "@helpers/data/loadDataDispatch.ts";
import handleImport from "@helpers/data/importFromFile.ts";

const SettingsView = () => {
    const dispatch = useDispatch();

    // State for tracking when data was exported
    const [hasExported, setHasExported] = useState(false);

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

    const [importedData, setImportedData] = useState<importData | null>(null);
    const handleSave = async () => {
        try {
            const response = await window.electron.saveData(combinedData);
            console.log("Response: ", response);
            setHasExported(true);
            console.log("True")
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    useEffect(() => {
        if(hasExported){
            const timer = setTimeout(() => {
                setHasExported(false);
                console.log("False")
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [hasExported]);
    useEffect(() => {
        if (!importedData) return;

        // Load data helper
        loadDataDispatch(importedData, dispatch);
    }, [importedData]);

    // State to unlock / lock username editing
    const [modifyUser, setModifyUser] = useState(false);

    const handleUpdateUser = () => {
        setModifyUser(true);
    }

    const [error, setError] = useState<string | null>(null);
    const handleConfirmUser = () => {
        if(document.getElementById('username') == null){
            return;
        }

        const userField = document.getElementById('username') as HTMLInputElement;
        const input = userField.value;

        if(input.length == 0){
            setError("Profile name is blank!");
            return;
        }

        if(input.length > 15){
            setError("Profile must be less than 15 characters!");
            userField.value = "";
            return;
        }

        dispatch(modifyUsername(input));
        setModifyUser(false);
        setError(null);
    }

    return (
        <div className={'view-content'}>
            <div id={'content-container'}>
                <div className={'username-container'}>
                    <h2>Profile Name</h2>
                    {
                        error !== null && (
                            <h3 className={'error'}>{error}</h3>
                        )
                    }

                    <div className={'username-control'}>
                        <input id={'username'}
                               className={'username-input'}
                               type={'text'}
                               placeholder={profileData.username}
                               disabled={!modifyUser}
                        />
                        {!modifyUser ?
                            <button className={'username-btn'} onClick={handleUpdateUser}>Update</button> :
                            <button className={'username-btn'} onClick={handleConfirmUser}>Confirm</button>
                        }

                    </div>
                </div>
                <div className={'data-container'}>
                    <h2>Import / Export Data</h2>
                    {importedData && (
                        <div className={'successful-import'}>
                            <h3>Data imported!</h3>
                        </div>
                    )}
                    {hasExported && (
                        <div className={'successful-import'}>
                            <h3>Data exported!</h3>
                        </div>
                    )}
                    <div className={'data-controls'}>
                    <button
                            onClick={handleSave}
                            className={"setting-btn"}>
                            Export JSON
                        </button>
                        <button
                            onClick={() => handleImport(setImportedData)}
                            className="setting-btn"
                        >
                            Load JSON
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsView;