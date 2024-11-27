import {
    ADD_COMPLETED_TASK, UNDO_COMPLETED_TASK,
    UPDATE_ACTIVE_TASKS,
    UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from "../actionTypes/actionTypes.ts";
import {Task} from 'types/quest';

// Navigation state
export interface NavState{
    navVisible: boolean;
    currentPath: string;
}

// User info state
export interface UserState{
    userLevel: number;
    username: string;
}

// Task status state
export enum TaskStatusFilter{
    Active = 0,
    Completed,
    Locked
}

// Task data state
export interface TaskDataState{
    active: Task[];
    locked: Task[];
    completed: Task[];
    allTasks: Task[];
}

// User task state
export interface UserTasksState{
    userTaskData: TaskDataState;
    tasksCompleted: number;
    tasksCount: number;
    traderFilter: number;
    statusFilter: TaskStatusFilter;
    filterByTrader: boolean;
}

// Hideout state
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
    payload:boolean;
}

export interface AddCompletedTaskAction {
    type: typeof ADD_COMPLETED_TASK;
    payload: Task;
}

export interface updateActiveTasksAction{
    type: typeof UPDATE_ACTIVE_TASKS;
    payload: Task[];
}

export interface updateLockedTasksAction{
    type: typeof UPDATE_LOCKED_TASKS;
    payload: Task[];
}

export interface updateCompletedTasksAction{
    type: typeof UPDATE_COMPLETED_TASKS;
    payload: Task[];
}

export interface UndoCompletedTaskAction {
    type: typeof UNDO_COMPLETED_TASK;
    payload: Task;
}

export type ReducerActions =
    | ReducerActionNumber
    | ReducerActionString
    | ReducerActionBoolean
    | AddCompletedTaskAction
    | UndoCompletedTaskAction
    | updateCompletedTasksAction
    | updateLockedTasksAction
    | updateActiveTasksAction;