import {TaskStatusFilter} from "@customTypes/types.ts";
import TraderList from "../../data/traders.json";
import {Task} from "@customTypes/quest.ts";

// Filters tasks by trader
export const getFilteredTasks = (
        statusFilter : TaskStatusFilter,
        completedTasks : Task[],
        lockedTasks : Task[],
        activeTasks : Task[],
        traderID : number
) => {
    const taskMap = {
        [TaskStatusFilter.Active]: activeTasks,
        [TaskStatusFilter.Completed]: completedTasks,
        [TaskStatusFilter.Locked]: lockedTasks
    };

    const trader = TraderList.data.traders[traderID];
    const tasks = taskMap[statusFilter];

    return tasks ? tasks.filter((task) => task.trader.id === trader.id) : [];
}