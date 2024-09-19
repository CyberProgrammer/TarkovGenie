import React from "react";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {changeStatusFilter} from "../../actions/userActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";


interface StatusFilterButtonProps{
    buttonText: string
    selectedValue: TaskStatusFilter
}
const StatusFilterButton : React.FC<StatusFilterButtonProps> = ({buttonText, selectedValue}) => {
    const dispatch = useDispatch();
    const taskStatusFilter = useSelector((state: RootState) => state.tasks.statusFilter);

    return (
        <button
            className={`control-filter-btn ${taskStatusFilter === selectedValue ? 'selected-btn' : ''}`}
            onClick={() => dispatch(changeStatusFilter(selectedValue))}
        >
            {buttonText}
        </button>
    )
}

export default StatusFilterButton;