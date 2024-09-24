import ChangeLevelBtn from "@components/buttons/change_level_btn.tsx";
import React from "react";

interface Props {
    level: number
}

const UserLevelWrapper : React.FC<Props> = ({level}) => {
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