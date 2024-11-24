import {useEffect, useMemo, useRef, useState} from "react";
import {RootState} from "@reducers/rootReducer.ts";
import {useDispatch, useSelector} from "react-redux";

import "@styles/views/items/neededItems.css";
import {HideoutItemNeeded, TaskItemNeeded} from "@customTypes/items.ts";

import PlusIcon from "@icons/needed_items/plus.svg";
import MinusIcon from "@icons/needed_items/minus.svg";

import {findDefaultGunItem} from "@helpers/needed/findDefaultGunItem.ts";
import {decreaseFoundItemCount, increaseFoundItemCount, toggleCompletion} from "../../actions/itemsActions.ts";

const NeededItemsView = () => {
    const dispatch = useDispatch();

    const [visibleTasks, setVisibleTasks] = useState<number>(15);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const allItemData = useSelector((state: RootState) => state.itemsNeeded.allItemData);
    const userTaskItemsNeeded = useSelector((state: RootState) => state.itemsNeeded.neededTaskItems);
    const userHideoutItemsNeeded = useSelector((state: RootState) => state.itemsNeeded.neededHideoutItems);

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTaskItems = useMemo(() => {
        return searchQuery !== ""
            ? userTaskItemsNeeded.filter((task) => task && task.item.includes(searchQuery))
            : userTaskItemsNeeded;
    }, [searchQuery, userTaskItemsNeeded]);

    const filteredHideoutItems = useMemo(() => {
        return searchQuery !== ""
            ? userHideoutItemsNeeded.filter((hideout) => hideout.item.name.includes(searchQuery))
            : userHideoutItemsNeeded;
    }, [searchQuery, userHideoutItemsNeeded]);

    const neededItemList: (TaskItemNeeded | HideoutItemNeeded)[] = useMemo(() => {
        if (selectedFilter === 'All') {
            console.log("All filter selected...");
            return [...filteredTaskItems, ...filteredHideoutItems];
        } else if (selectedFilter === 'Tasks') {
            console.log("Tasks filter selected...");
            return filteredTaskItems;
        } else if (selectedFilter === 'Hideout') {
            console.log("Hideout filter selected...");
            return filteredHideoutItems;
        }
        // Default return value to avoid undefined
        return [];
    }, [selectedFilter, filteredTaskItems, filteredHideoutItems]);

    // Lazy load more tasks on scroll
    useEffect(() => {
        if(!neededItemList)
            return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleTasks < neededItemList.length) {
                setVisibleTasks((prevVisibleTasks) => Math.min(prevVisibleTasks + 20, neededItemList.length));
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        });

        const currentLoadMoreRef = loadMoreRef.current;
        if (currentLoadMoreRef) {
            observer.observe(currentLoadMoreRef);
        }

        return () => {
            if (currentLoadMoreRef) {
                observer.unobserve(currentLoadMoreRef);
            }
        };
    }, [visibleTasks]);

    const handleUpdateCount = (item: TaskItemNeeded|HideoutItemNeeded, type:string) => {
        const isTaskItem = "taskName" in item;

        switch (type) {
            case 'increase':
                dispatch(increaseFoundItemCount(item.id, isTaskItem));
                break;
            case 'decrease':
                dispatch(decreaseFoundItemCount(item.id, isTaskItem));
                break;
            case 'toggle':
                dispatch(toggleCompletion(item.id, isTaskItem));
                break;
            default:
                break;
        }
    };

    return(
        <div className={'view-content'}>
            <div className={'header-controls'}>
                <div className={'filter-div'}>
                    {['All', 'Tasks', 'Hideout'].map((filter) => (
                        <button
                            key={filter}
                            className={`item-filter-btn ${selectedFilter === filter ? 'selected-btn' : ''}`}
                            onClick={() => setSelectedFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className={'search-div'}>
                    <input className={'search-input'} type={"search"} placeholder={"Search by item"} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
            </div>
            <div id={'content-container'}>
                <div className={"card-container"}>
                    {neededItemList && neededItemList.slice(0, visibleTasks).map((item, index) => {
                        if(!item){
                            return null;
                        }

                        // Confirm that the item exists and contains necessary fields
                        const isTaskItem = "taskName" in item;

                        const taskItem = isTaskItem ? item as TaskItemNeeded : null;
                        const hideoutItem = !isTaskItem ? item as HideoutItemNeeded : null;

                        const itemImage = taskItem ? taskItem.image : hideoutItem?.item.iconLink;

                        const isItemCompleted = item.count === item.totalCount;

                        if (!itemImage || !taskItem && !hideoutItem) {
                            // Return null or a fallback element if the item is invalid or missing key fields
                            return null;
                        }

                        return (
                            <div className={"card"} key={index}>
                                <div className={"card-header"}>
                                    {isTaskItem ? (
                                        // TaskItemNeeded (type includes 'gun')
                                        (() => {
                                            if(!taskItem){
                                                return null;
                                            }

                                            const defaultGunItem = findDefaultGunItem(taskItem as TaskItemNeeded, allItemData);
                                            return defaultGunItem ? (
                                                <img
                                                    className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                                    src={defaultGunItem.image512pxLink}
                                                    alt={defaultGunItem.name}
                                                />
                                            ) : (
                                                <img
                                                    className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                                    src={taskItem.image}
                                                    alt={taskItem.item}
                                                />
                                            );
                                        })()
                                    ) : (
                                        // HideoutItemNeeded
                                        <img
                                            className={`card-item-img item-bg-default`}
                                            src={hideoutItem?.item.iconLink}
                                            alt={hideoutItem?.item.name}
                                        />
                                    )}
                                </div>

                                {/* Card content with completed-card class if item is completed */}
                                <div className={`card-content ${isItemCompleted ? "completed-card" : ""}`}>
                                    <div className={"card-task-info"}>
                                        {isTaskItem ? (
                                            <h3>
                                                <a href={taskItem?.wikiLink}>{taskItem?.taskName}</a>
                                            </h3>
                                        ) : (
                                            <>
                                                <h3>{hideoutItem?.stationName}</h3>
                                                <h3>Level {hideoutItem?.level}</h3>
                                            </>
                                        )}
                                        <p>
                                            {isTaskItem ? taskItem?.item : hideoutItem?.item.name}
                                        </p>
                                    </div>

                                    {/* Controls to adjust item counts */}
                                    <div className={"card-controls"}>
                                        <button
                                            onClick={() => handleUpdateCount(item, 'decrease')}
                                            className={"card-control"}
                                        >
                                            <img className={"card-control-icon"} src={MinusIcon} alt={"Decrease"} />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateCount(item, 'toggle')}
                                            className={"card-control"}
                                        >
                                            {`${item.count}/${item.totalCount}`}
                                        </button>
                                        <button
                                            onClick={() => handleUpdateCount(item, 'increase')}
                                            className={"card-control"}
                                        >
                                            <img className={"card-control-icon"} src={PlusIcon} alt={"Increase"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {neededItemList && visibleTasks < neededItemList.length && (
                        <div ref={loadMoreRef} className="load-more">
                            <p>Loading more tasks...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NeededItemsView;