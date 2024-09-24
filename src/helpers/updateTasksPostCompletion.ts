import {getCurrentActive} from "@helpers/getActiveTasks.ts";
import {getCurrentLocked} from "@helpers/getLockedTasks.ts";
import {Task} from "@customTypes/quest.ts";

export const updateTasksPostCompletion = (taskList: Task[], currentActiveTasks: Task[], currentCompletedTasks: Task[], userLevel: number) => {
    if(Array.isArray(currentActiveTasks) && Array.isArray(currentCompletedTasks)){
        const newActiveTasks = getCurrentActive(taskList, currentCompletedTasks, userLevel);
        const newLockedTasks = getCurrentLocked(taskList, currentCompletedTasks, newActiveTasks);

        return {newActiveTasks, newLockedTasks};
    }
}