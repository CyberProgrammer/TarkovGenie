import {HideoutItemNeeded, TaskItemNeeded} from "@customTypes/items.ts";

export const increaseCount = (
    id: string,
    neededItemList: (TaskItemNeeded | HideoutItemNeeded)[]):
    (TaskItemNeeded | HideoutItemNeeded)[] => {

    const itemIndex = neededItemList.findIndex((item) => item.id === id);
    if(itemIndex !== -1){
        const currentItem = neededItemList[itemIndex];
        const currentCount = currentItem.count;
        const totalCount = neededItemList[itemIndex].totalCount;

        // Check if count is already satisfied
        if(currentCount >= totalCount) return neededItemList;

        console.log(itemIndex);
        const updatedList = [...neededItemList];

        if ("taskName" in currentItem) {
            // Handle TaskItemNeeded
            updatedList[itemIndex] = {
                ...currentItem,
                count: currentCount + 1,
            } as TaskItemNeeded;
        } else if ("stationName" in currentItem) {
            // Handle HideoutItemNeeded
            updatedList[itemIndex] = {
                ...currentItem,
                count: currentCount + 1,
            } as HideoutItemNeeded;
        }

        return updatedList;
    }

    return neededItemList;
}