import AllItemData from '@data/items.json';
import {TaskItemNeeded, ItemsNeededState, HideoutItemNeeded, ItemActions} from "@customTypes/items.ts";
import {Task} from "@customTypes/quest.ts";

import TaskList from "@data/tasks.json";
import HideoutData from "@data/hideout.json";

import {HideoutStation} from "@customTypes/hideout.ts";
import {
    DECREASE_FOUND_ITEM_COUNT,
    INCREASE_FOUND_ITEM_COUNT,
    TOGGLE_COMPLETION_STATUS
} from "../actionTypes/actionTypes.ts";

const allTaskData: Task[] = TaskList.data.tasks;
const allHideoutData = HideoutData.data.hideoutStations;

const initialItemState : ItemsNeededState = {
    allItemData: AllItemData.data.items,
    neededTaskItems: generateNeededTaskItems(allTaskData),
    neededHideoutItems: generateNeededHideoutItems(allHideoutData),
}

function generateNeededTaskItems(allTaskData: Task[]): TaskItemNeeded[] {
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

            return {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: itemsList.map(item => {
                    if(item.id === itemID){
                        const newCount = Math.min(item.count + 1, item.totalCount);
                        return { ...item, count: newCount };
                    }
                    return item;
                }),
            }
        }
        case DECREASE_FOUND_ITEM_COUNT:{
            const { itemID, isTaskItem } = action.payload;
            const itemsList = isTaskItem ? state.neededTaskItems : state.neededHideoutItems;

            return {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: itemsList.map(item => {
                    if (item.id === itemID) {
                        // Prevent count from going below 0
                        const newCount = Math.max(item.count - 1, 0);
                        return { ...item, count: newCount };
                    }
                    return item;
                }),
            };
        }
        case TOGGLE_COMPLETION_STATUS:{
            const { itemID, isTaskItem } = action.payload;
            const itemsList = isTaskItem ? state.neededTaskItems : state.neededHideoutItems;

            return {
                ...state,
                [isTaskItem ? 'neededTaskItems' : 'neededHideoutItems']: itemsList.map(item => {
                    if (item.id === itemID) {
                        // Check if count requirement is met already
                        if(item.count === item.totalCount){
                            return {...item, count: 0};
                        }
                        return {...item, count: item.totalCount};
                    }
                    return item;
                }),
            }
        }
        default:
            return state;
    }
}

export default itemsReducer;