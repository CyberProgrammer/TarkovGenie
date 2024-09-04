import {CLOSE_NAV, TOGGLE_NAV } from '../actionTypes/actionTypes';

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

export { toggleNav, closeNav};