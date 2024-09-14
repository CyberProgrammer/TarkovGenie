import {
    INCREASE_HIDEOUT_ITEMS_FOUND, DECREASE_HIDEOUT_ITEMS_FOUND
} from '../actionTypes/actionTypes.js';

import { ReducerActionString } from 'types/types'
const initialHideoutState = {
    hideoutItemsFound: 54,
    totalHideoutItems: 300,
};

const hideoutReducer = (state = initialHideoutState, action: ReducerActionString) => {
    switch (action.type) {
        case INCREASE_HIDEOUT_ITEMS_FOUND:
            return {
                ...state,
                hideoutItemsFound: state.hideoutItemsFound + 1,
            };
        case DECREASE_HIDEOUT_ITEMS_FOUND:
            return {
                ...state,
                hideoutItemsFound: state.hideoutItemsFound - 1,
            };
        default:
            return state;
    }
};

export default hideoutReducer;
