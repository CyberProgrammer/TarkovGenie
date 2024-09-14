export interface NavState{
    navVisible: boolean;
}

export interface UserState{
    userLevel: number;
    username: string;
}

export interface TaskState{
    tasksCompletedCount: number,
    totalTasksCount: number;
    taskItemsFoundCount: number;
    totalTaskItemsCount: number;
}

export interface HideoutState{
    hideoutItemsFoundCount: number;
    totalHideoutItemsCount: number;
}

export interface ReducerActionNumber{
    type: string;
    payload?: number
}

export interface ReducerActionString{
    type:string;
    payload?: string;
}

export interface ReducerActionBoolean{
    type:string;
    payload?:boolean;
}
