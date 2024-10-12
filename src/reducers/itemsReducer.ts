import {ReducerActionString} from "@customTypes/types.ts";
import AllItemData from '@data/items.json';
import {TaskItemNeeded, ItemsNeededState} from "@customTypes/items.ts";
import {Task} from "@customTypes/quest.ts";
import TaskList from "@data/tasks.json";

const allTaskData: Task[] = TaskList.data.tasks;

const initialItemState : ItemsNeededState = {
    allItemData: AllItemData.data.items,
    neededTaskItems: generateUserNeededItems(allTaskData)
}

function generateUserNeededItems(allTaskData: Task[]): TaskItemNeeded[] {
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

const itemsReducer = (state: ItemsNeededState = initialItemState, action: ReducerActionString) => {
    switch (action.type){

        default:
            return state;
    }
}

export default itemsReducer;