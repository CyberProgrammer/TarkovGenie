import {Task} from "@customTypes/quest.ts";

export const getCurrentLocked = (taskList: Task[], completedTasks: Task[], activeTasks: Task[]) => {
    const activeTaskIds = new Set(activeTasks.map(task => task.id));
    const completedTaskIds = new Set(completedTasks.map(task => task.id));

    return taskList.filter((task) => {
        // Check if the task is neither active nor completed
        const isNotActive = !activeTaskIds.has(task.id);
        const isNotCompleted = !completedTaskIds.has(task.id);

        return isNotActive && isNotCompleted;
    });
}