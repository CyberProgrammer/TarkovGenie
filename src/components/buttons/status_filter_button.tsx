import React from "react";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {changeStatusFilter} from "../../actions/userActions.ts";
import {useDispatch} from "react-redux";


interface StatusFilterButtonProps{
    buttonText: string
    selectedValue: TaskStatusFilter
    taskStatusFilter: TaskStatusFilter
}
const StatusFilterButton : React.FC<StatusFilterButtonProps> = ({buttonText, selectedValue, taskStatusFilter}) => {
    const dispatch = useDispatch();

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