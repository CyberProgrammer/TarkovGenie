import {useEffect, useRef, useState} from "react";
import {RootState} from "@reducers/rootReducer.ts";
import {useSelector} from "react-redux";

import "@styles/views/items/neededItems.css";
import {TaskItemNeeded} from "@customTypes/items.ts";

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

    const [neededItemList, setNeededItemList] = useState<TaskItemNeeded[]>(userTaskItemsNeeded);
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState("");

    // Handle search filter
    useEffect(() => {
        if(searchQuery != ""){
            const filteredList = userTaskItemsNeeded.filter((obj) => obj.item.includes(searchQuery));
            setNeededItemList(filteredList);
        } else{
            setNeededItemList(userTaskItemsNeeded);
        }

        console.log("Search: ", searchQuery);
    }, [searchQuery]);

    // Lazy load more tasks on scroll
    useEffect(() => {
        const currentLoadMoreRef = loadMoreRef.current;

        const observer = new IntersectionObserver((entries) => {
            console.log("Entries...");
            if (entries[0].isIntersecting && visibleTasks < neededItemList.length) {
                console.log("Intersecting...");
                // When the user scrolls to the loadMoreRef element, load more tasks
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
                    {neededItemList.slice(0, visibleTasks).map((taskItem, index) => (
                        <div className={"card"} key={index}>
                            <div className={"card-header"}>
                                {taskItem.types.includes("gun") ? (
                                    // If the type includes 'gun', find and display the default gun item
                                    (() => {
                                        const defaultGunItem = findDefaultGunItem(taskItem, allItemData);

                                        return defaultGunItem ? (
                                            <img
                                                className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                                src={defaultGunItem.image512pxLink}
                                                alt={defaultGunItem.name}
                                            />
                                        ) : null;
                                    })()
                                ) : (
                                    // If the type does not include 'gun', display the task item image
                                    <img className={`card-item-img ${"item-bg-" + taskItem.backgroundColor}`}
                                         src={taskItem.image} alt={taskItem.item}/>
                                )}
                            </div>
                            <div
                                className={`card-content ${taskItem.count === taskItem.totalCount ? "completed-card" : ""}`}>
                                <div className={"card-task-info"}>
                                    <h3>
                                        <a href={taskItem.wikiLink}>{taskItem.taskName}</a>
                                    </h3>
                                    <p>{taskItem.item}</p>
                                </div>
                                <div className={"card-controls"}>
                                    <button onClick={() => setNeededItemList(decreaseCount(taskItem.id, neededItemList))} className={"card-control"}>
                                        <img className={"card-control-icon"} src={MinusIcon} alt={"Decrease"}/>
                                    </button>
                                    <button onClick={() => setNeededItemList(toggleItemRequirements(taskItem.id, neededItemList))}
                                            className={"card-control"}>{`${taskItem.count}/${taskItem.totalCount}`}</button>
                                    <button onClick={() => setNeededItemList(increaseCount(taskItem.id, neededItemList))} className={"card-control"}>
                                        <img className={"card-control-icon"} src={PlusIcon} alt={"Increase"}/>
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