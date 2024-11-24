import {INCREASE_HIDEOUT_LEVEL, DECREASE_HIDEOUT_LEVEL, LOAD_HIDEOUT_DATA} from "../actionTypes/actionTypes.ts";
import {HideoutUserData} from "@customTypes/hideout.ts";

const increaseHideoutLevel = (hideoutID: string) => {
    return{
        type: INCREASE_HIDEOUT_LEVEL,
        payload: hideoutID,
    }
}

const decreaseHideoutLevel = (hideoutID: string) => {
    return{
        type: DECREASE_HIDEOUT_LEVEL,
        payload: hideoutID,
    }
}

const loadHideoutData = (hideoutData: HideoutUserData[]) => {
    return{
        type: LOAD_HIDEOUT_DATA,
        payload: hideoutData
    }
}
export {
    increaseHideoutLevel,
    decreaseHideoutLevel,
    loadHideoutData
}