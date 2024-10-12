import {TaskItemNeeded} from "@customTypes/items.ts";

export const decreaseCount = (id: string, neededItemList: TaskItemNeeded[]) => {
    const itemIndex = neededItemList.findIndex((item) => item.id === id);
    if(itemIndex !== -1){
        const currentCount = neededItemList[itemIndex].count;

        if(currentCount === 0)
            return neededItemList;

        console.log(itemIndex);
        const updatedList = [...neededItemList];

        updatedList[itemIndex] = {
            ...updatedList[itemIndex],
            count: updatedList[itemIndex].count - 1
        };

        return updatedList;
    }

    return neededItemList;
}