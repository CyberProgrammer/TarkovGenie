import { TOGGLE_NAV, CLOSE_NAV } from '../actionTypes/actionTypes.js'
import { UserState, UserAction } from '../types/types';

const initialState = {
    navVisible: true,
}

const userReducer = (state = initialState, action: UserAction): UserState => {
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
            }
        default:
            return state;
    }
}

export default userReducer;