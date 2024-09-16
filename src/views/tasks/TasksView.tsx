import TaskCard from "@components/cards/task_card";
import TaskList from '../../../data/tasks.json';
import TraderList from '../../../data/traders.json';

import '@styles/views/tasks/tasks.css';

import TradersList from "@components/list/trader_list.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {toggleFilterBy} from "../../actions/userActions.ts";
import {useEffect, useState} from "react";
const TasksView = () => {
    const dispatch = useDispatch();

    // State to manage the filtered tasks list
    const [filteredTasksList, setFilteredTasksList] = useState(TaskList.data.tasks);

    let tasksList = TaskList.data.tasks;
    const traderList = TraderList.data.traders;

    const filterByTrader = useSelector((state: RootState) => state.tasks.filterByTrader);
    const traderID = useSelector((state: RootState) => state.tasks.traderFilter);

    useEffect(() => {
        if (filterByTrader && typeof traderID === "number") {
            const trader = TraderList.data.traders[traderID];

            if (trader) {
                // Filter tasks by trader ID
                const filtered = TaskList.data.tasks.filter((t) => t.trader.id === trader.id);
                setFilteredTasksList(filtered); // Update state to trigger a re-render
            }
        } else {
            // Show all tasks if not filtering by trader
            setFilteredTasksList(TaskList.data.tasks);
        }
    }, [filterByTrader, traderID]);

    return(
        <>
            <div className={'view-content'}>
                <div className={'task-view-header'}>
                    <div className={'task-view-header-row'}>
                        <div className={'task-view-col'}>
                            <button
                                className={`control-filter-btn ${!filterByTrader ? 'selected-btn' : ''}`}
                                onClick={() => dispatch(toggleFilterBy(false))}
                            >
                                All
                            </button>
                            <button
                                className={`control-filter-btn ${filterByTrader ? 'selected-btn' : ''}`}
                                onClick={() => dispatch(toggleFilterBy(true))}
                            >
                                Traders
                            </button>
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
                </div>

                {filteredTasksList.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </>
    )
}

export default TasksView;