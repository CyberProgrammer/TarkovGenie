import '@styles/views/hideout/hideout.css';

import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import HideoutCardControls from "@components/controls/hideoutCardControls.tsx";
import {UserStationData} from "@customTypes/hideout.ts";
import {getUpgradableStations} from "@helpers/getUpgradableStations.ts";
import {useMemo, useState} from "react";
import {getStationDetails} from "@helpers/hideout/getStationDetails.ts";
import {getUpgradeRequirements} from "@helpers/hideout/getUpgradeRequirements.ts";
import {isStationUpgradable} from "@helpers/hideout/isStationUpgradable.ts";
import {getStationLevelRequirements} from "@helpers/hideout/getStationLevelRequirements.ts";

const HideoutView = () => {
    const stationData = useSelector((state: RootState) => state.hideout.stationData);
    const userStations: UserStationData[] = useSelector((state: RootState) => state.hideout.userStationData);

    // Filter by (All, Upgradable, Locked)
    const [selectedFilter, setSelectedFilter] = useState('All');

    const upgradableStations = useMemo(() => getUpgradableStations(stationData, userStations), [stationData, userStations]);

    const lockedStations = useMemo(() => userStations.filter(
        (station) => !upgradableStations.find((upgradableStation) => upgradableStation.id === station.id)
    ), [upgradableStations, userStations]);

    const filteredStations = useMemo(() => {
        switch (selectedFilter) {
            case 'Upgradable':
                return upgradableStations;
            case 'Locked':
                return lockedStations;
            default:
                return userStations;
        }
    }, [selectedFilter, userStations, upgradableStations, lockedStations]);


    return(
        <>
            <div className={'hideout-view'}>
                <div className={'hideout-view-header'}>
                    <div className={'hideout-header-controls'}>
                        {['All', 'Upgradable', 'Locked'].map((filter) => (
                            <button
                                key={filter}
                                className={`hideout-header-btn ${selectedFilter === filter ? 'selected-btn' : ''}`}
                                onClick={() => setSelectedFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={'hideout-view-container'}>
                    <div id={'content-container'} className={'hideout-card-grid'}>
                        {filteredStations.map((station) => (
                            <div key={station.id} className={'hideout-card'}>
                                <div className={'hideout-card-header'}>
                                    <div className={'hideout-card-header-name'}>
                                        <img src={station.imageLink} alt={station.id}/>
                                        <h3 className={'station-name'}>{station.name}</h3>
                                    </div>

                                    <h4 className={'station-level'}>Level {station.level}</h4>
                                </div>
                                <div className={'hideout-card-description'}>
                                    <p>{getStationDetails(station.id, stationData, userStations)}</p>
                                </div>
                                <div className={'hideout-card-requirements'}>
                                    {
                                        station.level === stationData.find((st) => st.id === station.id)?.levels.length && (
                                            <div>
                                                <h3>Maxed level</h3>
                                            </div>
                                        )
                                    }

                                    {getUpgradeRequirements(station.id, stationData, userStations)?.length > 0 && (
                                        getUpgradeRequirements(station.id, stationData, userStations).map((requirement, index) => (
                                            <div key={index} className={'hideout-card-requirement'}>
                                                <img src={requirement.item.iconLink} alt={'requirement'} />
                                                <h3 className={'requirement-count'}>{requirement.count}</h3>
                                                <h3>{requirement.item.name}</h3>
                                            </div>
                                        ))
                                    )}

                                    {
                                        getStationLevelRequirements(station.id, stationData, userStations).map((requirement, index) => (
                                            <div key={index} className={'hideout-card-requirement'}>
                                                <img src={requirement.station.imageLink} alt={'requirement'}/>
                                                <h3>{requirement.station.name}: Level {requirement.level}</h3>
                                            </div>
                                        ))
                                    }
                                </div>
                                <HideoutCardControls
                                    station={station}
                                    isStationUpgradable={isStationUpgradable}
                                    stationData={stationData}
                                    userStations={userStations}
                                    lockedStations={lockedStations}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HideoutView;