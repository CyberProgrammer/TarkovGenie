import {loadUserData} from "../../actions/userActions.ts";
import {loadHideoutData} from "../../actions/hideoutActions.ts";
import {loadTaskData} from "../../actions/taskActions.ts";
import {loadItemsData} from "../../actions/itemsActions.ts";
import {UserState, UserTasksState} from "@customTypes/types.ts";
import {HideoutUserData} from "@customTypes/hideout.ts";
import {ItemsNeededState} from "@customTypes/items.ts";
import {useDispatch} from "react-redux";

interface importData{
    profileData: UserState,
    hideoutData: HideoutUserData[],
    taskData: UserTasksState,
    itemsData: ItemsNeededState
}
const loadDataDispatch = (importedData: importData, dispatch: ReturnType<typeof useDispatch>) => {
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
}

export default loadDataDispatch;