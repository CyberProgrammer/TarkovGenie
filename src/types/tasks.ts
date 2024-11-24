import {
    ADD_COMPLETED_TASK, LOAD_TASK_DATA, UNDO_COMPLETED_TASK,
    UPDATE_ACTIVE_TASKS,
    UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from "../actionTypes/actionTypes.ts";
import {Task} from "@customTypes/quest.ts";
import {UserTasksState} from "@customTypes/types.ts";


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

export interface loadTaskAction{
    type: typeof LOAD_TASK_DATA;
    payload: UserTasksState;
}

export interface UndoCompletedTaskAction {
    type: typeof UNDO_COMPLETED_TASK;
    payload: Task;
}

export interface ReducerActionString{
    type:string;
    payload?: string;
}

export interface ReducerActionBoolean{
    type:string;
    payload:boolean;
}

export interface ReducerActionNumber{
    type: string;
    payload?: number;
}

export type TaskActions =
    AddCompletedTaskAction
    | UndoCompletedTaskAction
    | updateCompletedTasksAction
    | updateLockedTasksAction
    | updateActiveTasksAction
    | ReducerActionString
    | ReducerActionBoolean
    | ReducerActionNumber
    | loadTaskAction;