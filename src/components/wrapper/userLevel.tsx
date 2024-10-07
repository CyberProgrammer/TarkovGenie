import ChangeLevelBtn from "@components/buttons/change_level_btn.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import {useTaskUpdates} from "@hooks/useTaskUpdates.ts";

const UserLevelWrapper  = () => {
    const userState = useSelector((state: RootState)=> state.user);
    const taskList = useSelector((state: RootState) => state.tasks.userTaskData.allTasks)
    const level = userState.userLevel;

    useTaskUpdates(taskList);

    return (
        <div className="user-level-wrapper">
            <div className={'user-level-logo'}>
                {/* Level logo here */}
            </div>
            <div className={'user-level-value'}>
                <p className={'user-level-value-title'}>Level</p>
                <h2 className={'user-level'}>{level}</h2>
            </div>
            <div className={'user-level-controls'}>
                <ChangeLevelBtn action={'increase'} />
                <ChangeLevelBtn action={'decrease'} />
            </div>
        </div>
    );
};

export default UserLevelWrapper;