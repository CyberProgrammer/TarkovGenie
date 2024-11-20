import React from "react";
import CompleteIcon from '@icons/task_objectives/complete.svg';
import UndoIcon from '@icons/task_objectives/uncomplete.svg';
import LockedIcon from '@icons/task_objectives/locked.svg';

import '@styles/buttons/button_with_icon.css';
import {useDispatch} from "react-redux";
import {Task} from "@customTypes/quest.ts";
import {TaskStatusFilter} from "@customTypes/types.ts";
import {handleCompletedTask, handleUndoTask} from "../../actions/taskActions.ts";
import {generateNeededTaskItems} from "@reducers/itemsReducer.ts";
import {completeItemsFromTask} from "../../actions/itemsActions.ts";

interface ButtonWithIconProps {
    task: Task;
    type: TaskStatusFilter;
}

const ButtonWithIcon : React.FC<ButtonWithIconProps> = ({task, type}) => {
    const dispatch = useDispatch();

    // Handle button click logic
    const handleButtonClick = () => {
        // Check if task is defined and has an id
        if (task?.id && type == TaskStatusFilter.Active) {
            // Gather items needed for task, then dispatch them to be completed
            const neededFromTask = generateNeededTaskItems(Array(task));

            dispatch(completeItemsFromTask(neededFromTask));

            dispatch(handleCompletedTask(task));
        } else if(task?.id && type == TaskStatusFilter.Completed){
            console.log("Unlocking task...");
            //TODO Add the logic for undoing item completions from a task
            
            dispatch(handleUndoTask(task));
        }
    }

    const iconMap = {
        [TaskStatusFilter.Active]: {
            icon: CompleteIcon,
            label: 'Complete',
        },
        [TaskStatusFilter.Locked]: {
            icon: LockedIcon,
            label: 'Locked',
        },
        [TaskStatusFilter.Completed]: {
            icon: UndoIcon,
            label: 'Undo',
        }
    }

    const { icon, label } = iconMap[type];

    // Create the button content
    const content = (
        <>
            <img className={'btn-icon'} src={icon} alt={'icon'}/>
            <h3>{label}</h3>
        </>
    )

    return(
        <button onClick={handleButtonClick} className={'btn-with-icon'} disabled={type === TaskStatusFilter.Locked}>
            <div className={'btn-with-icon-wrapper'}>
                {content}
            </div>
        </button>
    )
}

export default ButtonWithIcon;