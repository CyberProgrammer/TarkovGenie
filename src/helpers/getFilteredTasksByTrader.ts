import {TaskStatusFilter} from "@customTypes/types.ts";
import TraderList from "../../data/traders.json";
import {Task} from "@customTypes/quest.ts";

// Filters tasks by trader
export const getFilteredTasks = (
        statusFilter : TaskStatusFilter,
        completedTasks : Task[],
        lockedTasks : Task[],
        activeTasks : Task[],
        traderID?: number | undefined,
) => {
    const taskMap = {
        [TaskStatusFilter.Active]: activeTasks,
        [TaskStatusFilter.Completed]: completedTasks,
        [TaskStatusFilter.Locked]: lockedTasks
    };

    const tasks = taskMap[statusFilter];

    // If traderID is provided, filter by trader
    if (traderID !== undefined) {
        const trader = TraderList.data.traders[traderID];
        return tasks ? tasks.filter((task) => task.trader.id === trader.id) : [];
    }

    return tasks ? tasks : [];
}