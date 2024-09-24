import React from "react";

import '@styles/cards/task-card.css'
import { Task } from "@customTypes/quest";

import ButtonWithIcon from "@components/buttons/button_with_icon";
import TaskCardInfo from "@components/taskCard/TaskCardInfo";
import TaskCardObjectives from "@components/taskCard/TaskCardObjectives";
import {TaskStatusFilter} from "@customTypes/types.ts";

interface TaskCardProps{
    task: Task;
    type: TaskStatusFilter;
}

const TaskCard : React.FC<TaskCardProps> = ({task, type}) => {

    return(
        <>
            <div className={'task-card'}>
                <TaskCardInfo task={task}/>
                <TaskCardObjectives task={task}/>
                <div className={'task-card-col controls third'}>
                    <ButtonWithIcon task={task} type={type}/>
                </div>
            </div>
        </>)
    }

export default TaskCard;