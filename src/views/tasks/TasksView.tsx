import '@styles/views/tasks/tasks.css';

import TaskCard from "@components/cards/task_card";

import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useEffect, useMemo, useRef, useState} from "react";
import {getFilteredTasks} from "@helpers/getFilteredTasksByTrader.ts";
import TasksHeader from "@components/headers/TasksHeader.tsx";

const TasksView = () => {
    // Define state for lazy loading
    const [visibleTasks, setVisibleTasks] = useState<number>(20);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const taskStatusFilter = useSelector((state: RootState) => state.tasks.statusFilter);
    const completedTasks = useSelector((state: RootState) => state.tasks.userTaskData.completed);
    const lockedTasks = useSelector((state: RootState) => state.tasks.userTaskData.locked);
    const activeTasks = useSelector((state: RootState) => state.tasks.userTaskData.active);
    const filterByTrader = useSelector((state: RootState) => state.tasks.filterByTrader);
    const traderID = useSelector((state: RootState) => state.tasks.traderFilter);


    // Memoized calculation of filtered tasks
    const filteredTasksList = useMemo(() => {
        // Validate tasks
        const tasksCompleted = Array.isArray(completedTasks) ? completedTasks : [];
        const tasksLocked = Array.isArray(lockedTasks) ? lockedTasks : [];
        const tasksActive = Array.isArray(activeTasks) ? activeTasks : [];

        // Determine valid trader ID
        const validTraderID = (filterByTrader && typeof traderID === 'number') ? traderID : undefined;

        return getFilteredTasks(taskStatusFilter, tasksCompleted, tasksLocked, tasksActive, validTraderID);
    }, [taskStatusFilter, filterByTrader, traderID, completedTasks, lockedTasks, activeTasks]);

    // Lazy load more tasks on scroll
    useEffect(() => {
        const currentLoadMoreRef = loadMoreRef.current;

        const observer = new IntersectionObserver((entries) => {
            console.log("Entries...");
            if (entries[0].isIntersecting && visibleTasks < filteredTasksList.length) {
                console.log("Intersecting...");
                // When the user scrolls to the loadMoreRef element, load more tasks
                setVisibleTasks((prevVisibleTasks) => Math.min(prevVisibleTasks + 10, filteredTasksList.length));
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });

        if (currentLoadMoreRef) {
            observer.observe(currentLoadMoreRef);
        }

        return () => {
            if (currentLoadMoreRef) {
                observer.unobserve(currentLoadMoreRef);
            }
        };
    }, [filteredTasksList.length, visibleTasks]);

    return(
        <>
            <div className={'view-content'}>
                <TasksHeader />
                <div id={'content-container'} className={'task-view-card-container'}>
                    {filteredTasksList.slice(0, visibleTasks).map((task) => (
                        <TaskCard key={task.id} type={taskStatusFilter} task={task} />
                    ))}
                </div>

                {visibleTasks < filteredTasksList.length && (
                    <div ref={loadMoreRef} className="load-more">
                        <p>Loading more tasks...</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default TasksView;