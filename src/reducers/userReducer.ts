import { INCREASE_LEVEL, DECREASE_LEVEL } from '../actionTypes/actionTypes.js';
import { ReducerActionString, UserState } from '../types/types';

const initialUserState : UserState = {
    userLevel: 1,
    username: "Test"
};

const userReducer = (state = initialUserState, action: ReducerActionString) => {
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
        default:
            return state;
    }
};

export default userReducer;
