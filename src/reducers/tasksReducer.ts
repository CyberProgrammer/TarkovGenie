import {
    ADD_COMPLETED_TASK,
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER,
    CHANGE_TRADER_FILTER,
    DECREASE_TASK_ITEMS_FOUND,
    DECREASE_TASKS_COMPLETED,
    INCREASE_TASK_ITEMS_FOUND,
    INCREASE_TASKS_COMPLETED
} from '../actionTypes/actionTypes.js';

import {ReducerActions, TaskDataState, TaskStatusFilter, UserTasksState} from 'types/types';

import TaskList from '../../data/tasks.json';
import {Task} from "@customTypes/quest.ts";

const userLevel = 1;

// Just to test the different status filters
const currentActive : Task[] = TaskList.data.tasks.filter((t) => t.minPlayerLevel <= userLevel);
const currentLocked : Task[] = TaskList.data.tasks.filter((t) => t.minPlayerLevel > userLevel);
const currentCompleted : Task[] = [];

const userTaskData : TaskDataState = {
    active: currentActive,
    locked: currentLocked,
    completed: currentCompleted,
}

const initialTasksState : UserTasksState = {
    userTaskData: userTaskData,
    tasksCompleted: 43,
    taskItemsFound: 54,
    totalTasks: 145,
    totalTaskItems: 924,
    traderFilter: 0,
    statusFilter: TaskStatusFilter.Active,
    filterByTrader: false
};

const tasksReducer = (state = initialTasksState, action: ReducerActions) => {
    switch (action.type) {
        case INCREASE_TASKS_COMPLETED:
            return {
                ...state,
                tasksCompleted: state.tasksCompleted + 1,
            };
        case DECREASE_TASKS_COMPLETED:
            return {
                ...state,
                tasksCompleted: state.tasksCompleted - 1,
            };
        case INCREASE_TASK_ITEMS_FOUND:
            return {
                ...state,
                taskItemsFound: state.taskItemsFound + 1,
            };
        case DECREASE_TASK_ITEMS_FOUND:
            return {
                ...state,
                taskItemsFound: state.taskItemsFound - 1,
            };
        case CHANGE_TRADER_FILTER:
            return {
                ...state,
                traderFilter: action.payload,
            }
        case CHANGE_FILTER_BY:
            return {
                ...state,
                filterByTrader: action.payload,
            }
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                statusFilter: action.payload as TaskStatusFilter,
            }
        case ADD_COMPLETED_TASK:
            // Check that the payload is a task
            if (action.payload && typeof action.payload === 'object' && 'id' in action.payload) {
                return {
                    ...state,
                    userTaskData: {
                        ...state.userTaskData,
                        completed: [...state.userTaskData.completed, action.payload],
                        active: state.userTaskData.active.filter((task) => task !== action.payload),
                    }
                }
            }
            return state;
        default:
            return state;
    }
};

export default tasksReducer;
