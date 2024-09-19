import {toggleFilterBy} from "../../actions/userActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import React from "react";

interface TraderFilterProps{
    buttonText: string,
    isFilter: boolean;
}
const TraderFilterButton : React.FC<TraderFilterProps> = ({buttonText, isFilter}) => {
    const dispatch = useDispatch();
    const filterByTrader = useSelector((state: RootState) => state.tasks.filterByTrader);

    let selected;
    // Determine what condition must be true for button to be selected
    if(buttonText === 'All')
        selected = !filterByTrader;
    else
        selected = filterByTrader;

    return (
        <button
            className={`control-filter-btn ${selected ? 'selected-btn' : ''}`}
            onClick={() => dispatch(toggleFilterBy(isFilter))}
        >
            {buttonText}
        </button>
    )
}

export default TraderFilterButton;
