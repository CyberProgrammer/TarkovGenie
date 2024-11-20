import {
    INCREASE_FOUND_ITEM_COUNT,
    DECREASE_FOUND_ITEM_COUNT,
    TOGGLE_COMPLETION_STATUS, COMPLETE_ITEMS_FROM_TASK
} from "../actionTypes/actionTypes.ts";
import {TaskItemNeeded} from "@customTypes/items.ts";

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

//TODO Add the logic for undoing item completions from a task

export {
    increaseFoundItemCount,
    decreaseFoundItemCount,
    toggleCompletion,
    completeItemsFromTask
}