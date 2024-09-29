import {INCREASE_HIDEOUT_LEVEL, DECREASE_HIDEOUT_LEVEL} from "../actionTypes/actionTypes.ts";

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

export {
    increaseHideoutLevel,
    decreaseHideoutLevel
}