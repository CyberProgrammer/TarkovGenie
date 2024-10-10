import {useEffect, useState} from "react";
import {RootState} from "@reducers/rootReducer.ts";
import {useSelector} from "react-redux";

import AllItemData from '@data/items.json';

import "@styles/views/items/neededItems.css";
import {ItemNeeded} from "@customTypes/items.ts";

import PlusIcon from "@icons/needed_items/plus.svg";
import MinusIcon from "@icons/needed_items/minus.svg";

const NeededItemsView = () => {

    const allTaskData = useSelector((state: RootState) => state.tasks.userTaskData.allTasks);
    const allItemData = AllItemData.data.items;

    const itemsToFind: ItemNeeded[] = [];

    allTaskData.map((task) => {
        const taskID = task.id;
        const taskName = task.name;
        const itemList: ItemNeeded[] = [];
        task.objectives.forEach((objective, index) => {
            if(objective && objective.count){
                if (objective.type === "giveItem" && objective.items && objective.items.length > 0) {
                    const item = objective.items[0];
                    itemList.push({
                        id: taskID+index,
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: Number(0),
                        totalCount: Number(objective.count)
                    });
                } else if (objective.type === "buildWeapon" && objective.item) {
                    itemList.push({
                        id: taskID+index,
                        taskName,
                        item: objective.item.name,
                        types: objective.item.types,
                        image: objective.item.image512pxLink,
                        backgroundColor: objective.item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: Number(0),
                        totalCount: 1
                    });
                } else if ((objective.type === "mark" || objective.type === "plantItem") && objective.items) {
                    objective.items.map((item) => itemList.push({
                        id: taskID+index,
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: Number(0),
                        totalCount: Number(objective.count)
                    }));
                }
            }
        });

        itemsToFind.push(...itemList); // Spread itemList into itemsToFind
    });

    const [neededItemList, setNeededItemList] = useState<ItemNeeded[]>([]);

    useEffect(() => {
        const newList = itemsToFind.filter((task) => task.item.length > 0);

        setNeededItemList(newList);

        console.log("Items: ", newList);
    }, []);


    const increaseCount = (id: string) => {
        const itemIndex = neededItemList.findIndex((item) => item.id === id);
        if(itemIndex !== -1){
            const currentCount = neededItemList[itemIndex].count;
            const totalCount = neededItemList[itemIndex].totalCount;

            if(currentCount >= totalCount)
                return;

            console.log(itemIndex);
            const updatedList = [...neededItemList];

            updatedList[itemIndex] = {
                ...updatedList[itemIndex],
                count: updatedList[itemIndex].count + 1
            };

            setNeededItemList(updatedList);
        }
    }

    const decreaseCount = (id: string) => {
        const itemIndex = neededItemList.findIndex((item) => item.id === id);
        if(itemIndex !== -1){
            const currentCount = neededItemList[itemIndex].count;

            if(currentCount === 0)
                return;

            console.log(itemIndex);
            const updatedList = [...neededItemList];

            updatedList[itemIndex] = {
                ...updatedList[itemIndex],
                count: updatedList[itemIndex].count - 1
            };

            setNeededItemList(updatedList);
        }
    }

    const toggleCompletion = (id: string) => {
        const itemIndex = neededItemList.findIndex((item) => item.id === id);
        if(itemIndex !== -1){
            const currentCount = neededItemList[itemIndex].count;
            const totalCount = neededItemList[itemIndex].totalCount;

            const updatedList = [...neededItemList];

            // If not yet completed, complete
            if(currentCount < totalCount){
                updatedList[itemIndex] = {
                    ...updatedList[itemIndex],
                    count: totalCount
                }
            }

            // If already completed, reset
            if(currentCount === totalCount){
                updatedList[itemIndex] = {
                    ...updatedList[itemIndex],
                    count: 0
                }
            }

            setNeededItemList(updatedList);
        }
    }

    return(
        <div className={'view-content'}>
            <div id={'content-container'}>
                <div className={"card-container"}>
                    {neededItemList.map((taskItem, index) => (
                        <div className={"card"} key={index}>
                            <div className={"card-header"}>
                                {taskItem.types.includes("gun") ? (
                                    // If the type includes 'gun', find and display the default gun item
                                    (() => {
                                        const defaultGunItem = allItemData.find((item) => item.name === taskItem.item + " Default");
                                        return defaultGunItem ? (
                                            <img
                                                 className={`card-item-img ${"item-bg-"+taskItem.backgroundColor}`}
                                                 src={defaultGunItem.image512pxLink}
                                                 alt={defaultGunItem.name}
                                            />
                                        ) : null;
                                    })()
                                ) : (
                                    // If the type does not include 'gun', display the task item image
                                    <img className={`card-item-img ${"item-bg-"+taskItem.backgroundColor}`} src={taskItem.image} alt={taskItem.item} />
                                )}
                            </div>
                            <div className={`card-content ${taskItem.count === taskItem.totalCount ? "completed-card" : ""}`}>
                                <div className={"card-task-info"}>
                                    <h3>
                                        <a href={taskItem.wikiLink}>{taskItem.taskName}</a>
                                    </h3>
                                    <p>{taskItem.item}</p>
                                </div>
                                <div className={"card-controls"}>
                                    <button onClick={() => decreaseCount(taskItem.id)} className={"card-control"}>
                                        <img className={"card-control-icon"} src={MinusIcon} alt={"Decrease"}/>
                                    </button>
                                    <button onClick={() => toggleCompletion(taskItem.id)} className={"card-control"}>{`${taskItem.count}/${taskItem.totalCount}`}</button>
                                    <button onClick={() => increaseCount(taskItem.id)} className={"card-control"}>
                                        <img className={"card-control-icon"} src={PlusIcon} alt={"Increase"}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NeededItemsView;