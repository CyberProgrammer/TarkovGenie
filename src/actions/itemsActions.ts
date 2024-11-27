import {
    INCREASE_FOUND_ITEM_COUNT,
    DECREASE_FOUND_ITEM_COUNT,
    TOGGLE_COMPLETION_STATUS,
    COMPLETE_ITEMS_FROM_TASK,
    INCREASE_HIDEOUT_ITEM_COUNT, LOAD_ITEM_DATA, UPDATE_ITEMS_DATA
} from "../actionTypes/actionTypes.ts";
import {ItemData, ItemsNeededState, TaskItemNeeded} from "@customTypes/items.ts";
import {HideoutStation} from "@customTypes/hideout.ts";
import {Task} from "@customTypes/quest.ts";

const increaseFoundItemCount = (itemID: string, isTaskItem: boolean) => {
    return{
        type: INCREASE_FOUND_ITEM_COUNT,
        payload: {itemID, isTaskItem}
    }
}

const decreaseFoundItemCount = (itemID: string, isTaskItem: boolean) => {
    return{
        type: DECREASE_FOUND_ITEM_COUNT,
        payload: {itemID, isTaskItem}
    }
}

const increaseFoundHideoutItemCount = (station: HideoutStation, isTaskItem: boolean) => {
    return{
        type: INCREASE_HIDEOUT_ITEM_COUNT,
        payload: {station, isTaskItem}
    }
}

const toggleCompletion = (itemID: string, isTaskItem: boolean) => {
    return {
        type: TOGGLE_COMPLETION_STATUS,
        payload: {itemID, isTaskItem}
    }
}

const completeItemsFromTask = (items : TaskItemNeeded[]) => {
    return {
        type: COMPLETE_ITEMS_FROM_TASK,
        payload: items
    }
}

const updateItemsData = (apiHideoutData: HideoutStation[], apiTaskData: Task[], apiItemData: ItemData[]) => {
    return{
        type: UPDATE_ITEMS_DATA,
        payload: {
            apiHideoutData: apiHideoutData,
            apiTaskData: apiTaskData,
            apiItemData: apiItemData
        }
    }
}

const loadItemsData = (itemsData: ItemsNeededState) => {
    return{
        type: LOAD_ITEM_DATA,
        payload: itemsData
    }
}
//TODO Add the logic for undoing item completions from a task

export {
    increaseFoundItemCount,
    decreaseFoundItemCount,
    toggleCompletion,
    completeItemsFromTask,
    increaseFoundHideoutItemCount,
    loadItemsData,
    updateItemsData
}