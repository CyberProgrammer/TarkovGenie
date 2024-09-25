
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateActiveTasks, updateCompletedTasks, updateLockedTasks } from 'actions/taskActions.ts';
import { getCompletedTasks } from "@helpers/getCompletedTasks.ts";
import { updateTasksPostCompletion } from "@helpers/updateTasksPostCompletion.ts";
import {Task} from "@customTypes/quest.ts";
import {RootState} from "@reducers/rootReducer.ts";

export const useTaskUpdates = (taskList: Task[], userLevel: number) => {
    const dispatch = useDispatch();

    const currentActiveTasks = useSelector((state: RootState) => state.tasks.userTaskData.active);
    const currentCompletedTasks = useSelector((state: RootState) => state.tasks.userTaskData.completed);
    useEffect(() => {
        if(!Array.isArray(currentActiveTasks) || !Array.isArray(currentCompletedTasks)){
            return;
        }

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
        if(!Array.isArray(currentCompletedTasks)){
            return;
        }

        const newCompletedTasks = getCompletedTasks(currentCompletedTasks, userLevel);
        dispatch(updateCompletedTasks(newCompletedTasks));
    }, [userLevel]);
};
