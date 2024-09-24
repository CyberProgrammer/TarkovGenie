import {Task} from "@customTypes/quest.ts";

export const getCompletedTasks = (currentCompleted: Task[], userLevel: number) => {
    return currentCompleted.filter((task) => task.minPlayerLevel <= userLevel);
}