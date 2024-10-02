import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";

export const isStationUpgradable = (id: string, stationData: HideoutStation[], userStations: UserStationData[]) => {
    const stationDetails = stationData.find((station) => station.id === id);
    const station = userStations.find((station) => station.id === id);

    if(station && stationDetails && stationDetails.levels){
        const stationLevel = station.level;
        return stationDetails.levels.length > stationLevel;
    }

    return false;
}