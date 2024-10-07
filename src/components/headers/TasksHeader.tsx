import TraderFilterButton from "@components/buttons/trader_filter_button.tsx";
import TradersList from "@components/list/trader_list.tsx";
import StatusFilterButton from "@components/buttons/status_filter_button.tsx";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import React from "react";

const TasksHeader = React.memo(() => {

    const filterByTrader = useSelector((state: RootState) => state.tasks.filterByTrader);
    const taskStatusFilter = useSelector((state:RootState) => state.tasks.statusFilter);

    return (
        <div className={'task-view-header'}>
            <div className={'task-view-header-row'}>
                <div className={'task-view-col'}>
                    <TraderFilterButton buttonText={'All'} isFilter={false}/>
                    <TraderFilterButton buttonText={'Traders'} isFilter={true}/>
                </div>
                <div className={'task-view-trader-list'}>
                    {!filterByTrader ?
                        (
                            <button className={'trader-filter-btn-full selected-btn'}>Showing All Sources</button>
                        ) :
                        (
                            <TradersList/>
                        )
                    }
                </div>
            </div>
            <div className={'task-view-status-row'}>
                <div className={'task-status-col'}>
                    <StatusFilterButton buttonText={'Active'} selectedValue={TaskStatusFilter.Active}
                                        taskStatusFilter={taskStatusFilter}/>
                    <StatusFilterButton buttonText={'Locked'} selectedValue={TaskStatusFilter.Locked}
                                        taskStatusFilter={taskStatusFilter}/>
                    <StatusFilterButton buttonText={'Completed'} selectedValue={TaskStatusFilter.Completed}
                                        taskStatusFilter={taskStatusFilter}/>
                </div>
            </div>
        </div>
    )
})

export default TasksHeader;