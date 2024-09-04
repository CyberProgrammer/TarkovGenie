export interface UserState{
    navVisible: boolean;
}

export interface ToggleNavAction{
    type:string;
}

export type UserAction = ToggleNavAction;