import {
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER,
    CHANGE_TRADER_FILTER,
    DECREASE_TASK_ITEMS_FOUND,
    DECREASE_TASKS_COMPLETED,
    INCREASE_TASK_ITEMS_FOUND,
    INCREASE_TASKS_COMPLETED
} from '../actionTypes/actionTypes.js';

import {ReducerActions, TaskDataState, TaskStatusFilter, UserTasksState} from 'types/types';

import TaskList from '../../data/tasks.json';

const userLevel = 1;

// Just to test the different status filters
const currentActive = TaskList.data.tasks.filter((t) => t.minPlayerLevel <= userLevel);
const currentLocked = TaskList.data.tasks.filter((t) => t.minPlayerLevel > userLevel);

const userTaskData : TaskDataState = {
    completed: TaskList.data.tasks,
    locked: currentLocked,
    active: currentActive,
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
        default:
            return state;
    }
};

export default tasksReducer;
