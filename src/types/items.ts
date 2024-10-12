export interface TaskItemNeeded{
    id: string;
    taskName: string;
    item: string;
    types: string[];
    image: string;
    backgroundColor: string;
    wikiLink: string;
    count: number;
    totalCount: number;
}

// Items needed state
export interface ItemData{
    id: string;
    name: string;
    image512pxLink: string;
}

export interface ItemsNeededState{
    allItemData: ItemData[];
    neededTaskItems: TaskItemNeeded[];
}