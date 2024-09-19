export interface NavState{
    navVisible: boolean;
}

export interface UserState{
    userLevel: number;
    username: string;
}

import {Task} from 'types/quest';

export enum TaskStatusFilter{
    Active = 0,
    Completed,
    Locked
}

export interface TaskDataState{
    completed: Task[];
    locked: Task[];
    active: Task[];
}

export interface UserTasksState{
    userTaskData: TaskDataState;
    tasksCompleted: number;
    taskItemsFound: number;
    totalTasks: number;
    totalTaskItems: number;
    traderFilter: number;
    statusFilter: TaskStatusFilter;
    filterByTrader: boolean;
}

export interface HideoutState{
    hideoutItemsFoundCount: number;
    totalHideoutItemsCount: number;
}

export interface ReducerActionNumber{
    type: string;
    payload?: number;
}

export interface ReducerActionString{
    type:string;
    payload?: string;
}

export interface ReducerActionBoolean{
    type:string;
    payload?:boolean;
}

export type ReducerActions =
    | ReducerActionNumber
    | ReducerActionString
    | ReducerActionBoolean;