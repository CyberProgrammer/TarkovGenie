import {INCREASE_LEVEL, DECREASE_LEVEL, LOAD_USER_DATA} from '../actionTypes/actionTypes.js';
import {UserState} from '../types/types';
import {UserActions} from "@customTypes/user.ts";

const initialUserState : UserState = {
    userLevel: 1,
    username: "Test"
};

const userReducer = (state = initialUserState, action: UserActions) => {
    switch (action.type) {
        case INCREASE_LEVEL:
            return {
                ...state,
                userLevel: state.userLevel < 79 ? state.userLevel + 1 : state.userLevel,
            };
        case DECREASE_LEVEL:
            return {
                ...state,
                userLevel: state.userLevel > 1 ? state.userLevel - 1 : state.userLevel,
            };
        case LOAD_USER_DATA:{
            const { userLevel, username } = action.payload;
            return {
                userLevel: userLevel,
                username: username
            };
        }

        default:
            return state;
    }
};

export default userReducer;
