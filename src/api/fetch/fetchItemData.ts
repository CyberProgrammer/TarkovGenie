import {ItemData} from "@customTypes/items.ts";

export const fetchItemData = async (): Promise<ItemData[]> => {
    try {
        const response = await fetch('https://api.tarkov.dev/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: `
                query {
                    items{
                        id
                        name
                        image512pxLink
                    }
                }
            `}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("ITEM API: ", result.data.items);
        return result.data.items;
    } catch (error) {
        console.error('Error fetching hideout data:', error);
        return [];
    }
};