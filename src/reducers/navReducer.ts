import { TOGGLE_NAV, CLOSE_NAV } from '../actionTypes/actionTypes.js';

import {NavState, ReducerActionString } from 'types/types'

const initialNavState : NavState = {
    navVisible: true,
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
        default:
            return state;
    }
};

export default navReducer;
