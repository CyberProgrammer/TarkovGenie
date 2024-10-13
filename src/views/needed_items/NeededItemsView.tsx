import {useEffect, useRef, useState} from "react";
import {RootState} from "@reducers/rootReducer.ts";
import {useSelector} from "react-redux";

import "@styles/views/items/neededItems.css";
import {HideoutItemNeeded, TaskItemNeeded} from "@customTypes/items.ts";

import PlusIcon from "@icons/needed_items/plus.svg";
import MinusIcon from "@icons/needed_items/minus.svg";
import {increaseCount} from "@helpers/needed/increaseCount.ts";
import {decreaseCount} from "@helpers/needed/decreaseCount.ts";
import {toggleItemRequirements} from "@helpers/needed/toggleItemRequirements.ts";
import {findDefaultGunItem} from "@helpers/needed/findDefaultGunItem.ts";

const NeededItemsView = () => {
    const [visibleTasks, setVisibleTasks] = useState<number>(20);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const allItemData = useSelector((state: RootState) => state.itemsNeeded.allItemData);
    const userTaskItemsNeeded = useSelector((state: RootState) => state.itemsNeeded.neededTaskItems);
    const userHideoutItemsNeeded = useSelector((state: RootState) => state.itemsNeeded.neededHideoutItems);

    const [filteredTaskItems, setFilteredTaskItems] = useState<TaskItemNeeded[]>([]);
    const [filteredHideoutItems, setFilteredHideoutItems] = useState<HideoutItemNeeded[]>([]);
    const [neededItemList, setNeededItemList] = useState<(TaskItemNeeded | HideoutItemNeeded)[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    // Filter and update lists for Tasks and Hideout separately
    useEffect(() => {
        const filterTasks = () => {
            return searchQuery !== ""
                ? userTaskItemsNeeded.filter((task) => task.item.includes(searchQuery))
                : userTaskItemsNeeded;
        };

        const filterHideouts = () => {
            return searchQuery !== ""
                ? userHideoutItemsNeeded.filter((hideout) => hideout.item.name.includes(searchQuery))
                : userHideoutItemsNeeded;
        };

        setFilteredTaskItems(filterTasks());
        setFilteredHideoutItems(filterHideouts());
    }, [searchQuery, userTaskItemsNeeded, userHideoutItemsNeeded]);

    // Combine lists based on the selected filter
    useEffect(() => {
        if (selectedFilter === 'All') {
            setNeededItemList([...filteredTaskItems, ...filteredHideoutItems]);
        } else if (selectedFilter === 'Tasks') {
            setNeededItemList(filteredTaskItems);
        } else if (selectedFilter === 'Hideout') {
            setNeededItemList(filteredHideoutItems);
        }
    }, [selectedFilter, filteredTaskItems, filteredHideoutItems]);

    // Lazy load more tasks on scroll
    useEffect(() => {
        const currentLoadMoreRef = loadMoreRef.current;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleTasks < neededItemList.length) {
                // Load more tasks
                setVisibleTasks((prevVisibleTasks) => Math.min(prevVisibleTasks + 20, neededItemList.length));
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
    }, [neededItemList.length, visibleTasks]);

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
                    {neededItemList.slice(0, visibleTasks).map((item, index) => (
                        <div className={"card"} key={index}>
                            <div className={"card-header"}>
                                {"taskName" in item ? (
                                    // TaskItemNeeded (type includes 'gun')
                                    (() => {
                                        const taskItem = item as TaskItemNeeded;
                                        const defaultGunItem = findDefaultGunItem(taskItem, allItemData);
                                        return defaultGunItem ? (
                                            <img
                                                className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                                src={defaultGunItem.image512pxLink}
                                                alt={defaultGunItem.name}
                                            />
                                        ) : <img className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                                 src={taskItem.image} alt={taskItem.item}/>;
                                    })()
                                ) : (
                                    // HideoutItemNeeded
                                    <img className={`card-item-img item-bg-default`}
                                         src={(item as HideoutItemNeeded).item.iconLink}
                                         alt={(item as HideoutItemNeeded).item.name}/>
                                )}
                            </div>
                            <div className={`card-content ${(item.count === item.totalCount ? "completed-card" : "")}`}>
                                <div className={"card-task-info"}>
                                    {"taskName" in item ? (
                                        <h3>
                                            <a href={(item as TaskItemNeeded).wikiLink}>{(item as TaskItemNeeded).taskName}</a>
                                        </h3>
                                    ) : (
                                        <>
                                            <h3>{item.stationName}</h3>
                                            <h3>Level {(item as HideoutItemNeeded).level}</h3>
                                        </>
                                    )}
                                    <p>
                                        {"taskName" in item ? (item as TaskItemNeeded).item : (item as HideoutItemNeeded).item.name}
                                    </p>
                                </div>
                                <div className={"card-controls"}>
                                    <button
                                        onClick={() => setNeededItemList(decreaseCount(item.id, neededItemList))}
                                        className={"card-control"}
                                    >
                                        <img className={"card-control-icon"} src={MinusIcon} alt={"Decrease"} />
                                    </button>
                                    <button
                                        onClick={() => setNeededItemList(toggleItemRequirements(item.id, neededItemList))}
                                        className={"card-control"}
                                    >
                                        {`${item.count}/${item.totalCount}`}
                                    </button>
                                    <button
                                        onClick={() => setNeededItemList(increaseCount(item.id, neededItemList))}
                                        className={"card-control"}
                                    >
                                        <img className={"card-control-icon"} src={PlusIcon} alt={"Increase"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {visibleTasks < neededItemList.length && (
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