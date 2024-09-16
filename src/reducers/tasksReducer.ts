import {
    INCREASE_TASKS_COMPLETED, DECREASE_TASKS_COMPLETED,
    INCREASE_TASK_ITEMS_FOUND, DECREASE_TASK_ITEMS_FOUND, CHANGE_TRADER_FILTER, CHANGE_FILTER_BY
} from '../actionTypes/actionTypes.js';

import {ReducerActions, TaskState} from 'types/types';

const initialTasksState : TaskState = {
    tasksCompleted: 43,
    taskItemsFound: 54,
    totalTasks: 145,
    totalTaskItems: 924,
    traderFilter: 0,
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
        default:
            return state;
    }
};

export default tasksReducer;
