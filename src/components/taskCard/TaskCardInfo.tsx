import { Task } from "@customTypes/quest";

import InfoIcon from '@icons/task_objectives/info.svg';

interface TaskCardInfo {
    task: Task;
}
const TaskCardInfo: React.FC<TaskCardInfo> = ({task}) => {

    const windowWidth = window.innerWidth;

    return(
        <>
            <div className={'task-card-col information first'}>
                <div className={'task-card-row task-header'}>
                    <img className={'task-card-trader-image'} src={task.trader.imageLink} alt={task.trader.name}/>
                    <h3>{task.name}</h3>
                </div>
                {windowWidth >= 1000 ?
                    <>
                        <div className={'task-card-row task-statistics'}>
                            <p>Level {task.minPlayerLevel}</p>

                        </div>
                        <div className={'task-card-row task-wiki'}>
                            <img className={'task-card-icon'} src={InfoIcon} alt={'icon'}/>
                            <a href={task.wikiLink}> Wiki Page</a>
                        </div>
                    </> : null
                }
            </div>
        </>
    )
}

export default TaskCardInfo;