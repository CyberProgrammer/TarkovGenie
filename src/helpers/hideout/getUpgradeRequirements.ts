import {isStationUpgradable} from "@helpers/hideout/isStationUpgradable.ts";
import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";

export const getUpgradeRequirements = (id: string, stationData: HideoutStation[], userStations: UserStationData[]) => {
    const stationDetails = stationData.find((station) => station.id === id);
    const station = userStations.find((station) => station.id === id);

    if(station && stationDetails && stationDetails.levels && isStationUpgradable(id, stationData, userStations)) {
        const stationLevels = stationDetails.levels;
        return stationLevels[station.level].itemRequirements;
    }

    return [];
}