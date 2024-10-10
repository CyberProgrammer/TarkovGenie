import {useEffect, useState} from "react";
import {RootState} from "@reducers/rootReducer.ts";
import {useSelector} from "react-redux";

import AllItemData from '@data/items.json';

import "@styles/views/items/neededItems.css";
import {ItemNeeded} from "@customTypes/items.ts";

const NeededItemsView = () => {

    const allTaskData = useSelector((state: RootState) => state.tasks.userTaskData.allTasks);
    const allItemData = AllItemData.data.items;

    const itemsToFind: ItemNeeded[] = [];

    allTaskData.map((task) => {
        const taskName = task.name;
        const itemList: ItemNeeded[] = [];
        task.objectives.forEach((objective) => {
            if(objective && objective.count){
                console.log(objective);
                if (objective.type === "giveItem" && objective.items && objective.items.length > 0) {
                    const item = objective.items[0];
                    itemList.push({
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: Number(objective.count)
                    });
                } else if (objective.type === "buildWeapon" && objective.item) {
                    itemList.push({
                        taskName,
                        item: objective.item.name,
                        types: objective.item.types,
                        image: objective.item.image512pxLink,
                        backgroundColor: objective.item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: 1
                    });
                } else if ((objective.type === "mark" || objective.type === "plantItem") && objective.items) {
                    objective.items.map((item) => itemList.push({
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: Number(objective.count)
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
                            <div className={"card-content"}>
                                <div className={"card-task-info"}>
                                    <h3>
                                        <a href={taskItem.wikiLink}>{taskItem.taskName}</a>
                                    </h3>
                                    <p>{taskItem.item}</p>
                                </div>
                                <div className={"card-controls"}>
                                    <button onClick={() => {}} className={"card-control"}></button>
                                    <button onClick={() => {}} className={"card-control"}>{`0/${taskItem.count}`}</button>
                                    <button onClick={() => {}} className={"card-control"}></button>
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