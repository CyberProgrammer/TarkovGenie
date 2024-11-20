import AllItemData from '@data/items.json';
import {TaskItemNeeded, ItemsNeededState, HideoutItemNeeded, ItemActions} from "@customTypes/items.ts";
import {Task} from "@customTypes/quest.ts";

import TaskList from "@data/tasks.json";
import HideoutData from "@data/hideout.json";

import {HideoutStation} from "@customTypes/hideout.ts";
import {
    COMPLETE_ITEMS_FROM_TASK,
    DECREASE_FOUND_ITEM_COUNT,
    INCREASE_FOUND_ITEM_COUNT,
    TOGGLE_COMPLETION_STATUS
} from "../actionTypes/actionTypes.ts";

const allTaskData: Task[] = TaskList.data.tasks;
const allHideoutData = HideoutData.data.hideoutStations;

const taskItemsNeeded = generateNeededTaskItems(allTaskData);
const hideoutItemsNeeded = generateNeededHideoutItems(allHideoutData);

const isCurrencyItem = ["Euros", "Dollars", "Roubles"]
const taskItemsNeededCount: number = taskItemsNeeded.reduce((acc, taskItem) => {
    if(isCurrencyItem.includes(taskItem.item)){
        acc += 1;
    } else{
        acc += Number(taskItem.totalCount);
    }
    return acc;
}, 0)

console.log(taskItemsNeeded);

const initialItemState : ItemsNeededState = {
    allItemData: AllItemData.data.items,
    neededTaskItems: taskItemsNeeded,
    taskItemCount: 0,
    taskItemTotalCount: taskItemsNeededCount,
    neededHideoutItems: hideoutItemsNeeded,
    hideoutItemCount: 0,
    hideoutItemTotalCount: hideoutItemsNeeded.length,
}

export function generateNeededTaskItems(allTaskData: Task[]): TaskItemNeeded[] {
    const itemsToFind: TaskItemNeeded[] = [];

    allTaskData.forEach((task) => {
        const taskID = task.id;
        const taskName = task.name;
        const itemList: TaskItemNeeded[] = [];

        task.objectives.forEach((objective, index) => {
            if (objective) {
                if (objective.type === "giveItem" && objective.items && objective.items.length > 0) {
                    const item = objective.items[0];
                    itemList.push({
                        id: taskID + index, // Generate unique id by appending index
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: 0,
                        totalCount: Number(objective.count)
                    });
                } else if (objective.type === "buildWeapon" && objective.item) {
                    itemList.push({
                        id: taskID + index,
                        taskName,
                        item: objective.item.name,
                        types: objective.item.types,
                        image: objective.item.image512pxLink,
                        backgroundColor: objective.item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: 0,
                        totalCount: 1
                    });
                } else if ((objective.type === "mark" || objective.type === "plantItem") && objective.items) {
                    objective.items.map((item) => itemList.push({
                        id: taskID + index,
                        taskName,
                        item: item.name,
                        types: item.types,
                        image: item.image512pxLink,
                        backgroundColor: item.backgroundColor,
                        wikiLink: task.wikiLink,
                        count: 0,
                        totalCount: Number(objective.count)
                    }));
                }
            }
        });

        itemsToFind.push(...itemList);
    });

    return itemsToFind;
}

function generateNeededHideoutItems(allHideoutData: HideoutStation[]){
    const itemsToFind: HideoutItemNeeded[] = [];

    allHideoutData.map((station) => {
        if(station && station.levels){
            station.levels.map((level) =>
                level.itemRequirements.map((requirement) => {
                    itemsToFind.push({
                        id: requirement.id,
                        stationName: station.name ?? 'Unknown Station',
                        level: level.level,
                        count: Number(0),
                        totalCount: Number(requirement.count),
                        item: requirement.item,
                    })
                }))
        }
    })

    return itemsToFind;
}

const itemsReducer = (state: ItemsNeededState = initialItemState, action: ItemActions) => {
    switch (action.type){
        case INCREASE_FOUND_ITEM_COUNT:{
            const { itemID, isTaskItem } = action.payload;
            const itemsList = isTaskItem ? state.neededTaskItems : state.neededHideoutItems;

            let countIncreased = false;
            let incrementAmount = 0;

            const updatedItemsList = itemsList.map(item => {
                if (item.id === itemID) {
                    const isCurrencyItem = ["Euros", "Dollars", "Roubles"]
                        .includes("taskName" in item ? item.item : item.item.name);

                    const newCount = Math.min(item.count + 1, item.totalCount);

                    if (newCount > item.count) {
                        countIncreased = true;

                        // If the item is a currency, it should only count once upon full completion
                        if (isCurrencyItem) {
                            if (newCount === item.totalCount) {
                                incrementAmount = 1; // Count only once when fully completed
                            }
                        } else {
                            incrementAmount = newCount - item.count; // Count incrementally
                        }
                    }

                    return { ...item, count: newCount };
                }
                return item;
            });

            let newState = {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: updatedItemsList,
            };

            // Update taskItemCount or hideoutItemCount if count increased
            if (countIncreased) {
                if (isTaskItem) {
                    newState = {
                        ...newState,
                        taskItemCount: state.taskItemCount + incrementAmount,
                    };
                } else {
                    newState = {
                        ...newState,
                        hideoutItemCount: state.hideoutItemCount + incrementAmount,
                    };
                }
            }

            return newState;
        }
        case DECREASE_FOUND_ITEM_COUNT:{
            const { itemID, isTaskItem } = action.payload;
            const itemsList = isTaskItem ? state.neededTaskItems : state.neededHideoutItems;

            // Track if the count was actually decreased
            let countDecreased = false;
            let decreaseAmount = 0;

            const updatedItemsList = itemsList.map(item => {
                if (item.id === itemID) {
                    const isCurrencyItem = ["Euros", "Dollars", "Roubles"]
                        .includes("taskName" in item ? item.item : item.item.name);

                    const newCount = Math.max(item.count - 1, 0);

                    if (newCount < item.count) {
                        countDecreased = true;

                        // If the item is a currency, it should only count once upon full completion
                        if (isCurrencyItem) {
                            if (newCount === item.totalCount) {
                                decreaseAmount = 1; // Count only once when fully completed
                            }
                        } else {
                            decreaseAmount = newCount - item.count; // Count incrementally
                        }
                    }
                    return { ...item, count: newCount };
                }
                return item;
            });

            let newState = {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: updatedItemsList,
            };

            // Update either taskItemCount or hideoutItemCount if count increased
            if (countDecreased) {
                if (isTaskItem) {
                    newState = {
                        ...newState,
                        taskItemCount: state.taskItemCount + decreaseAmount,
                    };
                } else {
                    newState = {
                        ...newState,
                        hideoutItemCount: state.hideoutItemCount + decreaseAmount,
                    };
                }
            }

            return newState;
        }
        case TOGGLE_COMPLETION_STATUS: {
            const { itemID, isTaskItem } = action.payload;
            const itemsList = isTaskItem ? state.neededTaskItems : state.neededHideoutItems;

            // Track how much to adjust the count by
            let countAdjusted = 0;

            const updatedItemsList = itemsList.map(item => {
                if (item.id === itemID) {
                    // Determine if the item is a currency by its name
                    const isCurrencyItem = ["Euros", "Dollars", "Roubles"]
                        .includes("taskName" in item ? item.item : item.item.name);

                    if (isCurrencyItem) {
                        if (item.count === item.totalCount) {
                            countAdjusted = -1;
                            // Set count to 0 when uncompleted
                            return { ...item, count: 0 };
                        } else {
                            countAdjusted = 1;
                            // Set count to totalCount when completed
                            return { ...item, count: item.totalCount };
                        }
                    } else {
                        if (item.count === item.totalCount) {
                            countAdjusted = -item.totalCount;
                            // Set count to 0 when uncompleted
                            return { ...item, count: 0 };
                        } else {
                            countAdjusted = item.totalCount - item.count;
                            // Set count to totalCount when completed
                            return { ...item, count: item.totalCount };
                        }
                    }
                }
                return item;
            });

            let newState = {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: updatedItemsList,
            };

            // Adjust taskItemCount or hideoutItemCount based on the completion/uncompletion
            if (isTaskItem) {
                newState = { ...newState, taskItemCount: state.taskItemCount + countAdjusted };
            } else {
                newState = { ...newState, hideoutItemCount: state.hideoutItemCount + countAdjusted };
            }

            return newState;
        }
        case COMPLETE_ITEMS_FROM_TASK:{
            const originalList = state.neededTaskItems;
            const itemsList = action.payload;
            console.log('Task items to complete: ', itemsList);

            if (!Array.isArray(itemsList) || itemsList.length === 0) {
                console.error("Payload is not a valid array:", itemsList);
                return state;
            }

            let countAdjusted = 0;

            const updatedItems = itemsList.map(item => {
                const foundItem = itemsList.find(payloadItem => payloadItem.id === item.id);
                if(foundItem){
                    const isCurrencyItem = ["Euros", "Dollars", "Roubles"]
                        .includes(item.item);

                    countAdjusted = isCurrencyItem ? countAdjusted += 1 : countAdjusted += item.totalCount

                    return{
                        ...item,
                        count: item.totalCount,
                    }
                }
            })

            const updatedList = originalList.map((original) => {
                const updated = updatedItems.find((entry) => entry && entry.id === original.id);
                return updated ? updated : original;
            })


            console.log("Previous items list: ", initialItemState.neededTaskItems);
            console.log("Updated Items List: ", updatedList);

            return {
                ...state,
                neededTaskItems: updatedList,
                taskItemCount: state.taskItemCount + countAdjusted
            };
        }

        default:
            return state;
    }
}

export default itemsReducer;