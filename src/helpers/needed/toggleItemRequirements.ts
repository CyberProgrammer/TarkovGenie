import {TaskItemNeeded} from "@customTypes/items.ts";

export const toggleItemRequirements = (id: string, neededItemList: TaskItemNeeded[]) => {
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

        return updatedList;
    }

    return neededItemList;
}