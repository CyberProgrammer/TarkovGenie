import {
    ADD_COMPLETED_TASK,
    UNDO_LOCKED_TASK,
    UPDATE_ACTIVE_TASKS, UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from "../actionTypes/actionTypes.ts";
import {Task} from 'types/quest';

export interface NavState{
    navVisible: boolean;
}

export interface UserState{
    userLevel: number;
    username: string;
}

export enum TaskStatusFilter{
    Active = 0,
    Completed,
    Locked
}

export interface TaskDataState{
    active: Task[];
    locked: Task[];
    completed: Task[];
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

export interface UndoLockedTaskAction {
    type: typeof UNDO_LOCKED_TASK;
    payload: Task;
}

export type ReducerActions =
    | ReducerActionNumber
    | ReducerActionString
    | ReducerActionBoolean
    | AddCompletedTaskAction
    | UndoLockedTaskAction
    | updateCompletedTasksAction
    | updateLockedTasksAction
    | updateActiveTasksAction;