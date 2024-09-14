import TaskCard from "@components/cards/task_card";
import TaskList from '../../../data/tasks.json';

import '@styles/views/tasks/tasks.css';

import TradersList from "@components/list/trader_list.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {toggleFilterBy} from "../../actions/userActions.ts";
const TasksView = () => {
    const dispatch = useDispatch();

    const tasksList = TaskList.data.tasks;

    const filterBy = useSelector((state: RootState) => state.tasks.filterByTrader)

    return(
        <>
            <div className={'view-content'}>
                <div className={'task-view-header'}>
                    <div className={'task-view-header-row'}>
                        <div className={'task-view-col'}>
                            <button
                                className={`control-filter-btn ${filterBy === 'all' ? 'selected-btn' : ''}`}
                                onClick={() => dispatch(toggleFilterBy(false))}
                            >
                                All
                            </button>
                            <button
                                className={`control-filter-btn ${filterBy != 'all' ? 'selected-btn' : ''}`}
                                onClick={() => dispatch(toggleFilterBy(true))}
                            >
                                Traders
                            </button>
                        </div>
                        <div className={'task-view-trader-list'}>
                            {filterBy === 'all' ?
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

                {tasksList.map(task => (
                    <TaskCard key={task.id} task={task}/>
                ))}
            </div>
        </>
    )
}

export default TasksView;