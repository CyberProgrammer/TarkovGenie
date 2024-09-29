import '@styles/views/tasks/tasks.css';

import TaskCard from "@components/cards/task_card";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {changeStatusFilter} from "../../actions/userActions.ts";
import {useEffect, useMemo} from "react";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {getFilteredTasks} from "@helpers/getFilteredTasksByTrader.ts";
import {getUnFilteredTasks} from "@helpers/getUnfilteredTaskList.ts";
import TraderFilterButton from "@components/buttons/trader_filter_button.tsx";
import TradersList from "@components/list/trader_list.tsx";
import StatusFilterButton from "@components/buttons/status_filter_button.tsx";


const TasksView = () => {
    const dispatch = useDispatch();

    // Selected task group
    const taskStatusFilter = useSelector((state: RootState) => state.tasks.statusFilter) ?? TaskStatusFilter.Active;

    // Keeps track of unfiltered task lists
    const completedTasks = useSelector((state: RootState) => state.tasks.userTaskData.completed ?? []);
    const lockedTasks = useSelector((state: RootState) => state.tasks.userTaskData.locked ?? []);
    const activeTasks = useSelector((state: RootState) => state.tasks.userTaskData.active ?? []);

    // Redux state for filtering by trader
    const filterByTrader = useSelector((state: RootState) => state.tasks.filterByTrader);
    const traderID = useSelector((state: RootState) => state.tasks.traderFilter);

    // Memoized calculation of filtered tasks
    const filteredTasksList = useMemo(() => {
        if(!Array.isArray(lockedTasks) || !Array.isArray(activeTasks) || !Array.isArray(completedTasks))
            return [];

        if (filterByTrader && typeof traderID === "number") {
            return getFilteredTasks(taskStatusFilter, completedTasks, lockedTasks, activeTasks, traderID);
        } else {
            return getUnFilteredTasks(taskStatusFilter, completedTasks, lockedTasks, activeTasks);
        }
    }, [taskStatusFilter, filterByTrader, traderID, completedTasks, lockedTasks, activeTasks]);

    // Re-render filtered task list on filter or trader change
    useEffect(() => {
        if(taskStatusFilter)
            dispatch(changeStatusFilter(taskStatusFilter));
    }, [dispatch, taskStatusFilter]);

    return(
        <>
            <div className={'view-content'}>
                <div className={'task-view-header'}>
                    <div className={'task-view-header-row'}>
                        <div className={'task-view-col'}>
                            <TraderFilterButton buttonText={'All'} isFilter={false} />
                            <TraderFilterButton buttonText={'Traders'} isFilter={true} />
                        </div>
                        <div className={'task-view-trader-list'}>
                            {!filterByTrader ?
                                (
                                    <button className={'trader-filter-btn-full selected-btn'}>Showing All Sources</button>
                                ) :
                                (
                                    <TradersList />
                                )
                            }
                        </div>
                    </div>
                    <div className={'task-view-status-row'}>
                        <div className={'task-status-col'}>
                            <StatusFilterButton buttonText={'Active'} selectedValue={TaskStatusFilter.Active} />
                            <StatusFilterButton buttonText={'Locked'} selectedValue={TaskStatusFilter.Locked} />
                            <StatusFilterButton buttonText={'Completed'} selectedValue={TaskStatusFilter.Completed} />
                        </div>
                    </div>
                </div>
                <div id={'content-container'} className={'task-view-card-container'}>
                    {filteredTasksList.map((task, index) => (
                        <TaskCard key={index} type={taskStatusFilter} task={task}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TasksView;