import {
    ADD_COMPLETED_TASK,
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER,
    CHANGE_TRADER_FILTER,
    DECREASE_TASK_ITEMS_FOUND,
    DECREASE_TASKS_COMPLETED,
    INCREASE_TASK_ITEMS_FOUND,
    INCREASE_TASKS_COMPLETED, UNDO_LOCKED_TASK,
    UPDATE_ACTIVE_TASKS, UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from '../actionTypes/actionTypes.js';

import {Task} from "@customTypes/quest.ts";
import {ReducerActions, TaskDataState, TaskStatusFilter, UserTasksState} from 'types/types';
import TaskList from '../../data/tasks.json';

import {getCurrentActive} from "@helpers/getActiveTasks.ts";
import {getCurrentLocked} from "@helpers/getLockedTasks.ts";
import {undoCompletedTask} from "@helpers/undoCompletedTask.ts";

const userLevel = 1;

const fullTaskList = TaskList.data.tasks;


// Just to test the different status filters
const currentCompleted : Task[] = [];
const currentActive : Task[] = getCurrentActive(fullTaskList, currentCompleted, userLevel);
const currentLocked : Task[] = getCurrentLocked(fullTaskList, currentCompleted, currentActive);

const taskData : TaskDataState = {
    active: currentActive,
    locked: currentLocked,
    completed: currentCompleted,
}

const initialTasksState : UserTasksState = {
    userTaskData: taskData,
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
                // Add the newly completed task to the completed task list
                const updatedCompletedTasks = [...state.userTaskData.completed, action.payload];
                const updatedActiveTasks = getCurrentActive(fullTaskList, updatedCompletedTasks , userLevel);
                const updatedLockedTasks = getCurrentLocked(fullTaskList, updatedCompletedTasks, updatedActiveTasks);

                return {
                    ...state,
                    userTaskData: {
                        ...state.userTaskData,
                        // Add the task to the completed list
                        completed: updatedCompletedTasks,

                        // Move the unlocked tasks to active and update active tasks
                        active: updatedActiveTasks,

                        // Remove the unlocked tasks from the locked list
                        locked: updatedLockedTasks,
                    }
                }
            }
            return state;
        case UNDO_LOCKED_TASK:
            if (action.payload && typeof action.payload === 'object'){
                return {
                    ...state,
                    userTaskData: {
                        ...state.userTaskData,
                        completed: undoCompletedTask(state.userTaskData.completed, action.payload, TaskList.data.tasks),
                        active: getCurrentActive(fullTaskList, state.userTaskData.completed, userLevel),
                        locked: getCurrentLocked(fullTaskList, state.userTaskData.completed, state.userTaskData.active),
                    }
                }
            }
            return state;
        case UPDATE_ACTIVE_TASKS:
            return {
                ...state,
                userTaskData:{
                    ...state.userTaskData,
                    active: action.payload,
                }
            }
        case UPDATE_LOCKED_TASKS:
            return {
                ...state,
                userTaskData:{
                    ...state.userTaskData,
                    locked: action.payload,
                }
            }
        case UPDATE_COMPLETED_TASKS:
            return {
                ...state,
                userTaskData:{
                    ...state.userTaskData,
                    completed: action.payload
                }
            }
        default:
            return state;
    }
};

export default tasksReducer;
