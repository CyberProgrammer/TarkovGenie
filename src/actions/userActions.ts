import
{
    CLOSE_NAV,
    TOGGLE_NAV,
    INCREASE_LEVEL,
    DECREASE_LEVEL,
    CHANGE_TRADER_FILTER,
    CHANGE_FILTER_BY, CHANGE_STATUS_FILTER, LOAD_USER_DATA, CHANGE_PATH
} from '../actionTypes/actionTypes';

import {TaskStatusFilter, UserState} from "@customTypes/types.ts";

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

const changePath = (path: string) => {
    return {
        type: CHANGE_PATH,
        payload: path
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

// Load data
const loadUserData  = (userData: UserState) => {
    return{
        type: LOAD_USER_DATA,
        payload: userData
    }
}

export
{
    toggleNav,
    closeNav,
    changePath,
    increaseLevel, 
    decreaseLevel,
    changeTraderFilter,
    changeStatusFilter,
    toggleFilterBy,
    loadUserData
};