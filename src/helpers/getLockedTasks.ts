import {Task} from "@customTypes/quest.ts";

export const getCurrentLocked = (taskList: Task[], completedTasks: Task[], activeTasks: Task[]) => {
    return taskList.filter((task) => {
        // Check if the task is neither active nor completed
        const isNotActive = !activeTasks.some(activeTask => activeTask.id === task.id);
        const isNotCompleted = !completedTasks.some(completedTask => completedTask.id === task.id);

        return isNotActive && isNotCompleted;
    })
}