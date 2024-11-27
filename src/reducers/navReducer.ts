import {TOGGLE_NAV, CLOSE_NAV, CHANGE_PATH} from '../actionTypes/actionTypes.js';

import {NavState, ReducerActionString} from 'types/types'

const initialNavState : NavState = {
    navVisible: true,
    currentPath: "Dashboard"
};

const navReducer = (state = initialNavState, action: ReducerActionString) => {
    switch (action.type) {
        case TOGGLE_NAV:
            return {
                ...state,
                navVisible: !state.navVisible,
            };
        case CLOSE_NAV:
            return {
                ...state,
                navVisible: false,
            };
        case CHANGE_PATH:{
            const newPath = action.payload;
            return {
                ...state,
                currentPath: newPath
            }
        }
        default:
            return state;
    }
};

export default navReducer;
