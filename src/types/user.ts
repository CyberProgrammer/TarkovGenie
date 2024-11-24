import {DECREASE_LEVEL, INCREASE_LEVEL, LOAD_USER_DATA} from "../actionTypes/actionTypes.ts";
import {UserState} from "@customTypes/types.ts";

export interface UserDataAction {
    type: typeof LOAD_USER_DATA;
    payload: UserState; // Strictly UserState
}

export interface LevelChangeAction {
    type: typeof INCREASE_LEVEL | typeof DECREASE_LEVEL;
    payload?: never; // No payload for these actions
}

export interface SetUsernameAction {
    type: 'SET_USERNAME';
    payload: string; // Strictly string
}

export type UserActions =
    | UserDataAction
    | LevelChangeAction
    | SetUsernameAction;
