import {Task} from "@customTypes/quest.ts";

// Get current active tasks with user level and requirements check
export const getCurrentActive = (taskList: Task[], completedTasks: Task[], userLevel:number) => {
    // Get tasks that meet the level requirement
    let activeTasks = taskList.filter(task => task.minPlayerLevel <= userLevel);

    // Filter out any completed tasks
    activeTasks = activeTasks.filter((task) => {
        return !completedTasks.some((completedTask) => task.id === completedTask.id);
    })

    // Get tasks that have their prerequisites met (or have no prerequisites)
    activeTasks = activeTasks.filter((task => {
        return task.taskRequirements.every(requirement => {
            return completedTasks.some(completedTask => completedTask.id === requirement.task.id);
        })
    }))

    return activeTasks;
}