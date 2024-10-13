import {HideoutItemNeeded, TaskItemNeeded} from "@customTypes/items.ts";

export const decreaseCount = (
    id: string,
    neededItemList: (TaskItemNeeded | HideoutItemNeeded)[]):
    (TaskItemNeeded | HideoutItemNeeded)[] => {

    const itemIndex = neededItemList.findIndex((item) => item.id === id);
    if(itemIndex !== -1){
        const currentItem = neededItemList[itemIndex];
        const currentCount = currentItem.count;

        // Check if count is already zero
        if (currentCount === 0) return neededItemList;

        console.log(itemIndex);
        const updatedList = [...neededItemList];

        if ("taskName" in currentItem) {
            // Handle TaskItemNeeded
            updatedList[itemIndex] = {
                ...currentItem,
                count: currentCount - 1,
            } as TaskItemNeeded;
        } else if ("stationName" in currentItem) {
            // Handle HideoutItemNeeded
            updatedList[itemIndex] = {
                ...currentItem,
                count: currentCount - 1,
            } as HideoutItemNeeded;
        }

        return updatedList;
    }

    return neededItemList;
}