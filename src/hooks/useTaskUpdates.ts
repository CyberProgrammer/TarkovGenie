import {startTransition, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateActiveTasks, updateCompletedTasks, updateLockedTasks } from 'actions/taskActions.ts';
import { getCompletedTasks } from "@helpers/getCompletedTasks.ts";
import { updateTasksPostCompletion } from "@helpers/updateTasksPostCompletion.ts";
import {Task} from "@customTypes/quest.ts";
import {RootState} from "@reducers/rootReducer.ts";

export const useTaskUpdates = (taskList: Task[]) => {
    const dispatch = useDispatch();

    const currentActiveTasks = useSelector((state: RootState) => state.tasks.userTaskData.active);
    const currentCompletedTasks = useSelector((state: RootState) => state.tasks.userTaskData.completed);
    const userLevel = useSelector((state:RootState) => state.user.userLevel);

    const updatedTasks = useMemo(() => {
        const activeTasks = Array.isArray(currentActiveTasks) ? currentActiveTasks : [];
        const completeTasks = Array.isArray(currentCompletedTasks) ? currentCompletedTasks : [];
        return updateTasksPostCompletion(taskList, activeTasks, completeTasks, userLevel);
    }, [taskList, currentActiveTasks, currentCompletedTasks, userLevel]);

    useEffect(() => {
        if(!Array.isArray(currentActiveTasks) || !Array.isArray(currentCompletedTasks)){
            return;
        }

        if (updatedTasks) {
            // Use startTransition for updating state
            startTransition(() => {
                if (updatedTasks.newActiveTasks && updatedTasks.newActiveTasks !== currentActiveTasks) {
                    dispatch(updateActiveTasks(updatedTasks.newActiveTasks));
                }
                if (updatedTasks.newLockedTasks && updatedTasks.newLockedTasks !== currentActiveTasks) {
                    dispatch(updateLockedTasks(updatedTasks.newLockedTasks));
                }
            });
        }
    }, [currentCompletedTasks, userLevel]);

    const newCompletedTasks = useMemo(() => {
        const completed = Array.isArray(currentCompletedTasks) ? currentCompletedTasks : [];
        return getCompletedTasks(completed, userLevel);
    }, [currentCompletedTasks, userLevel]);

    useEffect(() => {
        if(!Array.isArray(currentCompletedTasks)){
            return;
        }

        if(newCompletedTasks != currentCompletedTasks){
            dispatch(updateCompletedTasks(newCompletedTasks));
        }
    }, [userLevel]);
};
