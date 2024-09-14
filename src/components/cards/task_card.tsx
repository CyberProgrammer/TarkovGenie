import ButtonWithIcon from "@components/buttons/button_with_icon";

import '@styles/cards/task-card.css'
import { Task } from "@customTypes/quest";

import TaskCardInfo from "@components/taskCard/TaskCardInfo";
import TaskCardObjectives from "@components/taskCard/TaskCardObjectives";

interface TaskCardProps{
    task: Task;
}

const TaskCard : React.FC<TaskCardProps> = ({task}) => {

    return(
        <>
            <div className={'task-card'}>
                <TaskCardInfo task={task}/>
                <TaskCardObjectives task={task}/>
                <div className={'task-card-col controls third'}>
                    <ButtonWithIcon/>
                </div>
            </div>
        </>)
    }

export default TaskCard;