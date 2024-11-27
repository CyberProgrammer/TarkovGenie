import '@styles/views/hideout/hideout.css';

import {useSelector} from "react-redux";
import {RootState} from "@reducers/rootReducer.ts";
import HideoutCardControls from "@components/controls/hideoutCardControls.tsx";
import {getUpgradableStations} from "@helpers/getUpgradableStations.ts";
import {useMemo, useState} from "react";
import {getStationDetails} from "@helpers/hideout/getStationDetails.ts";
import {getUpgradeRequirements} from "@helpers/hideout/getUpgradeRequirements.ts";
import {isStationUpgradable} from "@helpers/hideout/isStationUpgradable.ts";
import {getStationLevelRequirements} from "@helpers/hideout/getStationLevelRequirements.ts";
import {getTraderLevelRequirements} from "@helpers/hideout/getTraderLevelRequirements.ts";
import {HideoutStation, HideoutUserData, Item} from "@customTypes/hideout.ts";

const HideoutView = () => {

    const stationData = useSelector((state: RootState) => state.hideout.stationData as HideoutStation[]);
    const userStations = useSelector((state: RootState) => state.hideout.userStationData as HideoutUserData[]);

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
                            <Requirements
                                stationId={station.id}
                                stationData={stationData}
                                userStations={userStations}
                            />
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
    )
}

interface RequirementsInterface {
    stationId: string,
    stationData: HideoutStation[],
    userStations: HideoutUserData[]
}
const Requirements = ({stationId, stationData, userStations}: RequirementsInterface) => {
    const items = getUpgradeRequirements(stationId, stationData, userStations);
    const stations = getStationLevelRequirements(stationId, stationData, userStations);
    const traders = getTraderLevelRequirements(stationId, stationData, userStations);

    return (
        <div className="hideout-card-requirements">
            {items.length > 0 &&
                items.map((req, index) => (
                    <RequirementItem key={index} item={req.item} count={req.count}/>
                ))}
            {stations.map((req, index) => (
                <StationRequirement key={index} station={req.station} level={req.level}/>
            ))}
            {traders.map((req, index) => (
                <TraderRequirement key={index} trader={req.trader} value={req.value}/>
            ))}
        </div>
    );
};

interface RequirementItemInterface{
    item: Item,
    count: number
}

const RequirementItem = ({item, count}:RequirementItemInterface) => (
    <div className="hideout-card-requirement">
        <img src={item.iconLink} alt="Requirement"/>
        <h3 className="requirement-count">{count}</h3>
        <h3>{item.name}</h3>
    </div>
);

interface StationRequirementInterface{
    station: HideoutStation,
    level: number
}

const StationRequirement = ({station, level}: StationRequirementInterface) => (
    <div className="hideout-card-requirement">
        <img src={station.imageLink} alt="Station Requirement"/>
        <h3>{station.name}: Level {level}</h3>
    </div>
);

interface Trader {
    name: string;
    imageLink?: string; // Optional if it might be missing
}

interface TraderRequirementInterface {
    trader: { imageLink: string; name: string } | Trader;
    value: number | string;
}

const TraderRequirement = ({trader, value}: TraderRequirementInterface) => (
    <div className="hideout-card-requirement">
        {trader.imageLink && (
            <>
                <img src={trader.imageLink} alt="Trader"/>
                <h3>{trader.name} (Level {value})</h3>
            </>
        )}
    </div>
);

export default HideoutView;