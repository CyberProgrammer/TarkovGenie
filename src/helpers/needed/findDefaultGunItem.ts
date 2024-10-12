import {ItemData, TaskItemNeeded} from "@customTypes/items.ts";

export const findDefaultGunItem = (taskItem: TaskItemNeeded, allItemData: ItemData[]) => {
    const gunNameMap = {
        M4A1: " Carbine",
        DVL: " Urbana",
        PKP: " Zenit",
    };

    // Find the key that exists in the gunNameMap and is included in the taskItem.item
    const foundEntry = Object.entries(gunNameMap).find(
        ([key]) => taskItem.item.includes(key)
    );

    // If a key is found, use it to get the suffix, otherwise default to " Default"
    const suffix = foundEntry ? foundEntry[1] : " Default";

    // Return the default gun item from allItemData
    return allItemData.find((item) => item.name === taskItem.item + suffix);
};