
import {
    ADD_COMPLETED_TASK, LOAD_TASK_DATA, UNDO_COMPLETED_TASK,
    UPDATE_ACTIVE_TASKS, UPDATE_COMPLETED_TASKS,
    UPDATE_LOCKED_TASKS
} from '../actionTypes/actionTypes.ts'

import {Task} from "@customTypes/quest.ts";
import {UserTasksState} from "@customTypes/types.ts";

const updateActiveTasks = (tasks: Task[]) => {
    return{
        type: UPDATE_ACTIVE_TASKS,
        payload: tasks
    }
}

const updateLockedTasks = (tasks: Task[]) => {
    return{
        type: UPDATE_LOCKED_TASKS,
        payload: tasks
    }
}

const updateCompletedTasks = (tasks: Task[]) => {
    return{
        type: UPDATE_COMPLETED_TASKS,
        payload: tasks
    }
}

// Complete task
const handleCompletedTask = (task : Task) => {
    return {
        type: ADD_COMPLETED_TASK,
        payload: task,
    }
}

// Undo Completed Task
const handleUndoTask = (task: Task) => {
    return {
        type: UNDO_COMPLETED_TASK,
        payload: task,
    }
}

// Load task data
const loadTaskData = (taskData: UserTasksState) => {
    return{
        type: LOAD_TASK_DATA,
        payload: taskData
    }
}

export {
    updateActiveTasks,
    updateLockedTasks,
    updateCompletedTasks,
    handleCompletedTask,
    handleUndoTask,
    loadTaskData
}