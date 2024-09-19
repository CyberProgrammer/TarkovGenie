import {TaskStatusFilter} from "@customTypes/types.ts";
import {Task} from "@customTypes/quest.ts";

// Restores the tasks by status without trader filter
export const getUnFilteredTasks = (
    statusFilter : TaskStatusFilter,
    completedTasks : Task[],
    lockedTasks : Task[],
    activeTasks : Task[],
) => {
    const taskMap = {
        [TaskStatusFilter.Active]: activeTasks,
        [TaskStatusFilter.Completed]: completedTasks,
        [TaskStatusFilter.Locked]: lockedTasks
    };

    const tasks = taskMap[statusFilter];
    return tasks ? tasks : [];
}