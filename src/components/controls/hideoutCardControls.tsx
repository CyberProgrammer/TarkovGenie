import {UserStationData} from "@customTypes/hideout.ts";
import {useDispatch} from "react-redux";
import {decreaseHideoutLevel, increaseHideoutLevel} from "../../actions/hideoutActions.ts";

interface HideoutCardControlsProps {
    station: UserStationData,
    isStationUpgradable: (id:string) => boolean,
    isLocked: boolean,
}

const HideoutCardControls = ({ station, isStationUpgradable, isLocked}: HideoutCardControlsProps) => {
    const dispatch = useDispatch();

    return (
        <div className="hideout-card-controls">
            {station.level === 0 ? (
                <button
                    className={isLocked ? 'locked-btn' : 'upgrade-btn'}
                    onClick={() => dispatch(increaseHideoutLevel(station.id))}
                    disabled={isLocked}
                >
                    BUILD LEVEL 1
                </button>
            ) : (
                <>
                    {isStationUpgradable(station.id) && (
                        <button
                            className={isLocked ? 'locked-btn' : 'upgrade-btn'}
                            onClick={() => dispatch(increaseHideoutLevel(station.id))}
                            disabled={isLocked}
                        >
                            UPGRADE TO LEVEL {station.level + 1}
                        </button>
                    )}
                    <button
                        className={isLocked ? 'locked-btn' : 'downgrade-btn'}
                        onClick={() => dispatch(decreaseHideoutLevel(station.id))}
                        disabled={isLocked}
                    >
                        DOWNGRADE TO LEVEL {station.level - 1}
                    </button>
                </>
            )}
        </div>
    );
};

export default HideoutCardControls;
