import {
    INCREASE_FOUND_ITEM_COUNT,
    DECREASE_FOUND_ITEM_COUNT,
    TOGGLE_COMPLETION_STATUS
} from "../actionTypes/actionTypes.ts";

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
export {
    increaseFoundItemCount,
    decreaseFoundItemCount,
    toggleCompletion
}