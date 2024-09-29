import '@styles/views/hideout/hideout.css';

import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import HideoutCardControls from "@components/controls/hideoutCardControls.tsx";
import {UserStationData} from "@customTypes/hideout.ts";
import {getUpgradableStations} from "@helpers/getUpgradableStations.ts";
import {useState} from "react";

const HideoutView = () => {
    const stationData = useSelector((state: RootState) => state.hideout.stationData);
    const userStations: UserStationData[] = useSelector((state: RootState) => state.hideout.userStationData);

    // Filter by (All, Upgradable, Locked)
    const [selectedFilter, setSelectedFilter] = useState('All');

    const upgradableStations = getUpgradableStations(stationData, userStations);
    const lockedStations = userStations.filter((station) => {
        return !upgradableStations.find((upgradableStation) => upgradableStation.id === station.id);
    })

    let selectedStations = [];
    if(selectedFilter === 'All') {
        selectedStations = userStations;
    } else if(selectedFilter === 'Upgradable') {
        selectedStations = upgradableStations;
    } else{
        selectedStations = lockedStations;
    }

    const getStationDetails = (id: string) => {
        const stationDetails = stationData.find((station) => station.id === id);
        const currentStation = userStations.find((station) => station.id === id);

        if(stationDetails && currentStation) {
            if (currentStation.level === 0 || currentStation.level === 1) {
                return stationDetails.levels?.[0]?.description || "";
            }

            const levelIndex = currentStation.level - 1;
            if (stationDetails.levels && stationDetails.levels[levelIndex]?.description) {
                return stationDetails.levels[levelIndex].description;
            }
        }

        return "";
    }

    const isStationUpgradable = (id: string) => {
        const stationDetails = stationData.find((station) => station.id === id);
        const station = userStations.find((station) => station.id === id);

        if(station && stationDetails){
            const stationLevel = station.level;
            return stationDetails.levels.length > stationLevel;
        }

        return false;
    }

    const getUpgradeRequirements = (id: string) => {
        const stationDetails = stationData.find((station) => station.id === id);
        const station = userStations.find((station) => station.id === id);

        if(station && stationDetails && isStationUpgradable(id)){
            const stationLevels = stationDetails.levels;
            return stationLevels[station.level].itemRequirements;
        }

        return [];
    }


    return(
        <>
            <div className={'hideout-view'}>
                <div className={'hideout-view-header'}>
                    <div className={'hideout-header-controls'}>
                        <button
                            className={`hideout-header-btn ${selectedFilter === 'All' ? 'selected-btn' : ''}`}
                            onClick={() => setSelectedFilter('All')}
                        >
                            All
                        </button>
                        <button
                            className={`hideout-header-btn ${selectedFilter === 'Upgradable' ? 'selected-btn' : ''}`}
                            onClick={() => setSelectedFilter('Upgradable')}
                        >
                            Upgradable
                        </button>
                        <button
                            className={`hideout-header-btn ${selectedFilter === 'Locked' ? 'selected-btn' : ''}`}
                            onClick={() => setSelectedFilter('Locked')}
                        >
                            Locked
                        </button>
                    </div>
                </div>
                <div className={'hideout-view-container'}>
                    <div id={'content-container'} className={'hideout-card-grid'}>
                        {selectedStations.map((station, index) => (
                            <div key={index} className={'hideout-card'}>
                                <div className={'hideout-card-header'}>
                                    <h3 className={'station-name'}>{station.name}</h3>
                                    <h4 className={'station-level'}>Level {station.level}</h4>
                                </div>
                                <div className={'hideout-card-description'}>
                                    <p>{getStationDetails(station.id)}</p>
                                </div>
                                <div className={'hideout-card-requirements'}>
                                    { getUpgradeRequirements(station.id).map((requirement, index) => (
                                          <div key={index} className={'hideout-card-requirement'}>
                                              <img src={requirement.item.iconLink} alt={'requirement'}/>
                                              <h3 className={'requirement-count'}>{requirement.count}</h3>
                                              <h3>{requirement.item.name}</h3>
                                          </div>
                                    ))}
                                </div>
                                <HideoutCardControls
                                    key={index}
                                    station={station}
                                    isStationUpgradable={isStationUpgradable}
                                    isLocked={selectedFilter === 'Locked'}
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