
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveTasks, updateCompletedTasks, updateLockedTasks } from 'actions/taskActions.ts';
import { getCompletedTasks } from "@helpers/getCompletedTasks.ts";
import { updateTasksPostCompletion } from "@helpers/updateTasksPostCompletion.ts";
import {Task} from "@customTypes/quest.ts";


export const useTaskUpdates = (taskList: Task[], currentActiveTasks: Task[], currentCompletedTasks: Task[], userLevel: number) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const updatedTasks = updateTasksPostCompletion(taskList, currentActiveTasks, currentCompletedTasks, userLevel);

        if (updatedTasks) {
            if (updatedTasks.newActiveTasks) {
                dispatch(updateActiveTasks(updatedTasks.newActiveTasks));
            }
            if (updatedTasks.newLockedTasks) {
                dispatch(updateLockedTasks(updatedTasks.newLockedTasks));
            }
        }
    }, [userLevel, currentCompletedTasks]);

    useEffect(() => {
        const newCompletedTasks = getCompletedTasks(currentCompletedTasks, userLevel);
        dispatch(updateCompletedTasks(newCompletedTasks));
    }, [userLevel]);
};
