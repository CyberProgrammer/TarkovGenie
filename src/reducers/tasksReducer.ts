import {
    ADD_COMPLETED_TASK,
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER,
    CHANGE_TRADER_FILTER, LOAD_TASK_DATA,
    UNDO_COMPLETED_TASK,
    UPDATE_ACTIVE_TASKS, UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from '../actionTypes/actionTypes.js';

import {Task} from "@customTypes/quest.ts";
import {TaskDataState, TaskStatusFilter, UserTasksState} from 'types/types';
import TaskList from '../../data/tasks.json';

import {getCurrentActive} from "@helpers/getActiveTasks.ts";
import {getCurrentLocked} from "@helpers/getLockedTasks.ts";
import {undoCompletedTask} from "@helpers/undoCompletedTask.ts";
import {TaskActions} from "@customTypes/tasks.ts";

const userLevel = 1;

// All task data
const fullTaskList: Task[] = TaskList.data.tasks;

// Just to test the different status filters
const currentCompleted : Task[] = [];
const currentActive : Task[] = getCurrentActive(fullTaskList, currentCompleted, userLevel);
const currentLocked : Task[] = getCurrentLocked(fullTaskList, currentCompleted, currentActive);

const taskData : TaskDataState = {
    active: currentActive,
    locked: currentLocked,
    completed: currentCompleted,
    allTasks: fullTaskList
}

const initialTasksState : UserTasksState = {
    userTaskData: taskData,
    tasksCompleted: 0,
    tasksCount: fullTaskList.length,
    traderFilter: 0,
    statusFilter: TaskStatusFilter.Active,
    filterByTrader: false
};

const tasksReducer = (state = initialTasksState, action: TaskActions) => {
    switch (action.type) {
        case LOAD_TASK_DATA: {
            const { filterByTrader, statusFilter, tasksCompleted, tasksCount, traderFilter, userTaskData } = action.payload as UserTasksState;
            return {
                ...state,
                filterByTrader: filterByTrader,
                statusFilter: statusFilter,
                tasksCompleted: tasksCompleted,
                tasksCount: tasksCount,
                traderFilter: traderFilter,
                userTaskData: userTaskData,
            };
        }
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
                    tasksCompleted: updatedCompletedTasks.length,
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
        case UNDO_COMPLETED_TASK:
            if (action.payload && typeof action.payload === 'object'){
                const updatedCompletedList = undoCompletedTask(state.userTaskData.completed, action.payload, TaskList.data.tasks);

                // Calculate the number of tasks that were undone
                const tasksUndoneCount = state.userTaskData.completed.length - updatedCompletedList.length;

                return {
                    ...state,
                    tasksCompleted: state.tasksCompleted - tasksUndoneCount,
                    userTaskData: {
                        ...state.userTaskData,
                        completed: updatedCompletedList,
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
