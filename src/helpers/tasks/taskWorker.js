// taskWorker.js
import {getFilteredTasks} from "../getFilteredTasksByTrader.js";

self.onmessage = function (e) {
    const { taskStatusFilter, tasksCompleted, tasksLocked, tasksActive, traderID } = e.data;

    const filteredTasks = getFilteredTasks(taskStatusFilter, tasksCompleted, tasksLocked, tasksActive, traderID);

    // Send the filtered result back to the main thread
    self.postMessage(filteredTasks);
};
