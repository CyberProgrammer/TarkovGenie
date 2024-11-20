import
{
    CLOSE_NAV,
    TOGGLE_NAV,
    INCREASE_LEVEL,
    DECREASE_LEVEL,
    CHANGE_TRADER_FILTER,
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER
} from '../actionTypes/actionTypes';

import {TaskStatusFilter} from "@customTypes/types.ts";

// Action is used to send to the reducer

const toggleNav = () => {
    return {
        type: TOGGLE_NAV,
    };
};

const closeNav = () => {
    return {
        type: CLOSE_NAV,
    }
}

const increaseLevel = () => {
    return {
        type: INCREASE_LEVEL,
    }
}

const decreaseLevel = () => {
    return {
        type: DECREASE_LEVEL,
    }
}

// Task filter status
const changeTraderFilter = (newTraderFilter: number) => {
    return {
        type: CHANGE_TRADER_FILTER,
        payload: newTraderFilter,
    }
}

// Status filter
const changeStatusFilter = (newStatusFilter: TaskStatusFilter) => {
    return{
        type: CHANGE_STATUS_FILTER,
        payload: newStatusFilter,
    }
}

const toggleFilterBy = (filter: boolean) => {
    return {
        type: CHANGE_FILTER_BY,
        payload: filter,
    }
}

export
{
    toggleNav,
    closeNav,
    increaseLevel, 
    decreaseLevel,
    changeTraderFilter,
    changeStatusFilter,
    toggleFilterBy,
};