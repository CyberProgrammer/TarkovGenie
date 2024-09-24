import React from "react";
import CompleteIcon from '@icons/task_objectives/complete.svg';
import UndoIcon from '@icons/task_objectives/uncomplete.svg';
import LockedIcon from '@icons/task_objectives/locked.svg';

import '@styles/buttons/button_with_icon.css';
import {useDispatch} from "react-redux";
import {Task} from "@customTypes/quest.ts";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {handleCompletedTask, handleUndoTask} from "../../actions/taskActions.ts";

interface ButtonWithIconProps {
    task?: Task;
    type?: TaskStatusFilter;
}

const ButtonWithIcon : React.FC<ButtonWithIconProps> = ({task, type}) => {
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        // Check if task is defined and has an id
        if (task?.id && type == TaskStatusFilter.Active) {
            dispatch(handleCompletedTask(task));
        } else if(task?.id && type == TaskStatusFilter.Completed){
            console.log("Unlocking task...");
            dispatch(handleUndoTask(task));
        }
    }

    let content;
    if(type === TaskStatusFilter.Active){
        content = (
            <>
                <img className={'btn-icon'} src={CompleteIcon} alt={'icon'}/>
                <h3>Complete</h3>
            </>
        )
    } else if(type === TaskStatusFilter.Locked){
        content = (
            <>
                <img className={'btn-icon'} src={LockedIcon} alt={'icon'}/>
                <h3>Locked</h3>
            </>
        )
    } else{
        content = (
            <>
                <img className={'btn-icon'} src={UndoIcon} alt={'icon'}/>
                <h3>Undo</h3>
            </>
        )
    }

    return(
        <button onClick={handleButtonClick} className={'btn-with-icon'} disabled={type === TaskStatusFilter.Locked}>
            <div className={'btn-with-icon-wrapper'}>
                {content}
            </div>
        </button>
    )
}

export default ButtonWithIcon;