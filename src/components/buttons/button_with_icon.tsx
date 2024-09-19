import React from "react";
import CompleteIcon from '@icons/task_objectives/complete.svg';

import '@styles/buttons/button_with_icon.css';
import {useDispatch} from "react-redux";
import {handleCompletedTask} from "../../actions/userActions.ts";
import {Task} from "@customTypes/quest.ts";

interface ButtonWithIconProps {
    task?: Task;
}

const ButtonWithIcon : React.FC<ButtonWithIconProps> = ({task}) => {
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        // Check if task is defined and has an id
        if (task?.id) {
            dispatch(handleCompletedTask(task));
        }
    }

    return(
        <button onClick={handleButtonClick} className={'btn-with-icon'}>
            <div className={'btn-with-icon-wrapper'}>
                <img className={'btn-icon'} src={CompleteIcon} alt={'icon'} />
                <h3>Complete</h3>
            </div>
        </button>
    )
}

export default ButtonWithIcon;