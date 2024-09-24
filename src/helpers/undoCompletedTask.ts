import {Task} from "@customTypes/quest.ts";

export const undoCompletedTask = (completedTasks: Task[], taskToUndo: Task, allTasks: Task[]) => {
    // Remove the task from the completed list
    let updatedCompletedTasks = completedTasks.filter(task => task.id !== taskToUndo.id);

    // Check for tasks that depend on the task being undone
    const dependentTasks = allTasks.filter(task =>
        task.taskRequirements.some(req => req.task.id === taskToUndo.id)
    );

    // Recursively undo all dependent tasks
    dependentTasks.forEach(dependentTask => {
        updatedCompletedTasks = undoCompletedTask(updatedCompletedTasks, dependentTask, allTasks);
    });

    return updatedCompletedTasks;
}