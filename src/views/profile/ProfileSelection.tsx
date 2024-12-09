import {useState, useEffect} from "react";

import '@styles/views/profile/profile.css';
import {importData} from "@customTypes/types.ts";
import handleImport from "@helpers/data/importFromFile.ts";
import loadDataDispatch from "@helpers/data/loadDataDispatch.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";

const ProfileSelection = () => {
    // Redux Hooks
    const dispatch = useDispatch();
    const profileData = useSelector((root: RootState) => root.user);
    const hideoutData = useSelector((root: RootState) => root.hideout.userStationData);
    const taskData = useSelector((root: RootState) => root.tasks);
    const itemsData = useSelector((root: RootState) => root.itemsNeeded);

    // Default Data State
    const [defaultData] = useState({
        profileData,
        hideoutData,
        taskData,
        itemsData,
    });

    // Profile State Management
    const [isProfileSelected, setIsProfileSelected] = useState<boolean>(false);
    const [selectedProfile, setSelectedProfile] = useState<string>("");
    const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false);

    // Input and Error Handling State
    const [newProfileInput, setNewProfileInput] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Profile List Management
    const [profiles, setProfiles] = useState<{ file: string, creationDate: Date }[]>([]);

    // Import Data State
    const [importedData] = useState<importData | null>(null);
    const [didLoadData, setDidLoadData] = useState<boolean>(false);

    // Fetch profiles from the Electron API
    const fetchProfiles = async () => {
        try {
            const files = await window.electron.getProfiles();
            console.log("Files: ", files);
            setProfiles(files);
        } catch (err) {
            console.error("Error fetching profiles:", err);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    // Save Location State and Fetch
    const [saveLocation, setSaveLocation] = useState<string>("");

    useEffect(() => {
        const fetchSaveLocation = async () => {
            try {
                const location = await window.electron.getSaveLocation();
                setSaveLocation(location);
            } catch (err) {
                console.error("Error getting save location:", err);
            }
        };

        fetchSaveLocation();
    }, []);

    // Profile Deletion Management
    const [deletePrompt, setDeletePrompt] = useState<boolean>(false);

    const handleDeleteClick = () => {
        setDeletePrompt(true);
    };

    const handleConfirmDeleteClick = async () => {
        // Find file path and add on the selected name
        const filepath = saveLocation + "\\" + selectedProfile;

        const response = await window.electron.deleteSave(filepath);

        if (response.success) {
            setSelectedProfile("");
            setDeletePrompt(false);
            fetchProfiles();
        }
    };

    // Profile Selection Handler
    const handleProfileClick = (selected: string) => {
        if (selectedProfile !== selected) {
            setSelectedProfile(selected);
        }
    };

    // Profile Loading Logic
    useEffect(() => {
        console.log("Updated import data");
    }, [importedData]);
    const handleLoadClick = async () => {
        console.log("Load Profile");

        if (!isProfileSelected) {
            console.log("Load req met...");
            const path = saveLocation + '\\' + selectedProfile;

            try {
                setIsProfileSelected(true);

                // Import data
                const dataPromise = new Promise<importData | null>((resolve) => {
                    const resolveData = (data: importData) => resolve(data);
                    handleImport(resolveData, path);
                });

                const importedData = await dataPromise;

                if (importedData) {
                    console.log("Loading data to dispatch");
                    loadDataDispatch(importedData, dispatch);
                    setDidLoadData(true);
                } else {
                    console.log("No data imported or imported data is null");
                }
            } catch (error) {
                console.error("Error during profile loading:", error);
            }
        }
    };


    const handleCreateClick = () => {
        setSelectedProfile("");
        setIsCreatingProfile(true);
    }
    const handleConfirmClick = async (value:string) => {
        if(value.length === 0){
            console.error("Field is empty... try again!");
            setIsError(true);
            setErrorMessage("Field is empty... try again!");
            return;
        }

        const saveData = {
            ...defaultData,
            profileData: {
                ...defaultData.profileData, // Copy the existing properties of profileData
                username: value, // Override the username
            },
        };

        console.log("Default data:", defaultData);
        const response = await window.electron.saveData(saveData);
        console.log("Response: ", response);
        setIsCreatingProfile(false);
        await fetchProfiles();
    }

    const handleCancelClick = () => {
        setSelectedProfile("Guest");
        setIsCreatingProfile(false);
        setIsError(false);
    }

    return (
        <div className={'view-content'}>
            <div id={'content-container'} className={'profile-container'}>
                <h2>Found Profiles</h2>
                <p> Select to load</p>
                {
                    didLoadData && (
                        <>
                            <h3 className={'success'}>Data loaded...</h3>
                        </>
                    )
                }
                <div className={'profiles-container'}>
                    {profiles.map((profile, index) => (
                        <>
                            <div className={'profile-row'}>
                                <h3 key={index}
                                    className={`${selectedProfile === profile.file ? 'selected-profile' : ''} selectable-profile profile-name`}
                                    onClick={() => handleProfileClick(profile.file)}
                                >
                                    {profile.file}
                                </h3>
                                <h3 key={index}
                                    className={`${selectedProfile === profile.file ? 'selected-profile' : ''} selectable-profile profile-date`}
                                    onClick={() => handleProfileClick(profile.file)}
                                >
                                    {profile.creationDate.toDateString()}
                                </h3>
                            </div>
                        </>
                    ))}
                </div>

                <div className={'controls-container'}>
                    <div className={'inputs'}>
                        {
                            isCreatingProfile && (
                                <>
                                    <h3>Profile name</h3>
                                    {
                                        isError && (
                                            <h3 className={'error'}>{errorMessage}</h3>
                                        )
                                    }
                                    <input type={'text'} placeholder={'Username'}
                                           onChange={(e) => setNewProfileInput(e.target.value)}/>
                                </>
                            )
                        }
                    </div>
                    <div className={'controls'}>
                        { selectedProfile != "" && (
                            <>
                                <button className={'profile-btn'} onClick={handleLoadClick}>Load</button>
                                {!deletePrompt ?
                                    <button className={'profile-btn'} onClick={handleDeleteClick}>Delete</button>
                                    :
                                    <button className={'profile-btn'} onClick={handleConfirmDeleteClick}>Confirm?</button>
                                }

                            </>
                        )
                        }
                        {
                        !isCreatingProfile && (
                                <>

                                    <button className={'profile-btn'} onClick={handleCreateClick}>Create Profile</button>
                                </>
                            )
                        }
                        {
                            isCreatingProfile && (
                                <>
                                    <button className={'profile-btn'}
                                            onClick={() => handleConfirmClick(newProfileInput)}>Confirm
                                    </button>
                                    <button className={'profile-btn'} onClick={handleCancelClick}>Cancel</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSelection;