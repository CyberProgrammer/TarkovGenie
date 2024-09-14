import { Task } from '@customTypes/quest';
import getObjectiveTypeIcon from '@helpers/getObjectiveTypeIcon';

interface TaskCardObjectives {
    task: Task;
}

const TaskCardObjectives: React.FC<TaskCardObjectives> = ({task}) => {

    return(
        <>
            <div className={'task-card-col objectives second'}>
                <div className={'task-objecive-wrapper'}>
                    {task.objectives.map(objective => (
                        <div key={objective.id} className={'task-card-objective-row'}>
                            <div className={'task-card-objective-icon-wrapper'}>
                                <img className={'task-card-objective-icon'}
                                     src={getObjectiveTypeIcon(objective.type)} alt={'icon'}/>
                            </div>
                            <p>
                                {objective.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TaskCardObjectives;