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

export interface HideoutItemNeeded{
    id: string;
    stationName: string;
    level: number;
    count: number;
    totalCount: number;
    item: HideoutItem;
}

export interface HideoutItem{
    id: string;
    name: string;
    iconLink: string;
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
    neededHideoutItems: HideoutItemNeeded[];
}