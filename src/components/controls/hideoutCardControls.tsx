import { HideoutStation, UserStationData } from "@customTypes/hideout";
import { useDispatch } from "react-redux";
import { decreaseHideoutLevel, increaseHideoutLevel } from "../../actions/hideoutActions";
import {increaseFoundHideoutItemCount} from "../../actions/itemsActions.ts";

interface HideoutCardControlsProps {
    station: UserStationData;
    isStationUpgradable: (id: string, stationData: HideoutStation[], userStations: UserStationData[]) => boolean;
    stationData: HideoutStation[];
    userStations: UserStationData[];
    lockedStations: HideoutStation[];
}

const HideoutCardControls = ({ station, isStationUpgradable, lockedStations, stationData, userStations}: HideoutCardControlsProps) => {
    const dispatch = useDispatch();

    const handleUpgrade = () => {
        const isTaskItem = false;

        // Increase hideout items found
        dispatch(increaseFoundHideoutItemCount(station, isTaskItem));

        // Increase hideout level
        dispatch(increaseHideoutLevel(station.id));
    }

    const handleDowngrade = () => {

        // Decrease hideout level
        dispatch(decreaseHideoutLevel(station.id));
    }

    // Use the station.id to determine if the station is locked
    const isLocked = !!lockedStations.find((lockedStation) => lockedStation.id === station.id);
    const buttonClass = isLocked ? 'locked-btn' : '';

    const canUpgrade = isStationUpgradable(station.id, stationData, userStations);

    return (
        <div className="hideout-card-controls">
            {station.level === 0 ? (
                <button
                    className={`${buttonClass} upgrade-btn`}
                    onClick={handleUpgrade}
                    disabled={isLocked}
                >
                    BUILD LEVEL 1
                </button>
            ) : (
                <>
                    {canUpgrade && (
                        <button
                            className={`${buttonClass} upgrade-btn`}
                            onClick={handleUpgrade}
                            disabled={isLocked}
                        >
                            UPGRADE TO LEVEL {station.level + 1}
                        </button>
                    )}
                    <button
                        className={`downgrade-btn`}
                        onClick={handleDowngrade}
                    >
                        DOWNGRADE TO LEVEL {station.level - 1}
                    </button>
                </>
            )}
        </div>
    );
};

export default HideoutCardControls;
