import {
    COMPLETE_ITEMS_FROM_TASK,
    DECREASE_FOUND_ITEM_COUNT,
    INCREASE_FOUND_ITEM_COUNT,
    INCREASE_HIDEOUT_ITEM_COUNT, LOAD_ITEM_DATA,
    TOGGLE_COMPLETION_STATUS, UPDATE_ITEMS_DATA
} from "../actionTypes/actionTypes.ts";

import {HideoutStation, HideoutUserData} from "@customTypes/hideout.ts";
import {Task} from "@customTypes/quest.ts";

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

export interface ItemData{
    id: string;
    name: string;
    image512pxLink: string;
}

export interface ItemsNeededState{
    allItemData: ItemData[];
    neededTaskItems: TaskItemNeeded[];
    taskItemCount: number;
    taskItemTotalCount: number;
    neededHideoutItems: HideoutItemNeeded[];
    hideoutItemCount: number;
    hideoutItemTotalCount: number;
}

/* Reducer */
interface UpdateItemCountPayload {
    itemID: string;
    isTaskItem: boolean;
}

interface UpdateHideoutCountPayload{
    station: HideoutUserData;
    isTaskItem: boolean;
}

interface IncreaseItemCountAction {
    type: typeof INCREASE_FOUND_ITEM_COUNT;
    payload: UpdateItemCountPayload;
}

interface DecreaseItemCountAction {
    type: typeof DECREASE_FOUND_ITEM_COUNT;
    payload: UpdateItemCountPayload;
}

interface IncreaseHideoutItemCountAction{
    type: typeof INCREASE_HIDEOUT_ITEM_COUNT;
    payload: UpdateHideoutCountPayload
}

interface ToggleCompletionAction {
    type: typeof TOGGLE_COMPLETION_STATUS;
    payload: UpdateItemCountPayload;
}

interface CompleteItemsFromTask{
    type: typeof COMPLETE_ITEMS_FROM_TASK;
    payload: TaskItemNeeded[]
}

interface ItemsDataAction{
    type: typeof LOAD_ITEM_DATA;
    payload: ItemsNeededState
}

interface ItemsUpdateAction{
    type: typeof UPDATE_ITEMS_DATA;
    payload: {
        apiHideoutData: HideoutStation[],
        apiTaskData: Task[],
        apiItemData: ItemData[]
    };
}

export type ItemActions = CompleteItemsFromTask |
    IncreaseItemCountAction |
    DecreaseItemCountAction |
    IncreaseHideoutItemCountAction |
    ToggleCompletionAction |
    ItemsDataAction |
    ItemsUpdateAction;