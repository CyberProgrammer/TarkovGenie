import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";

export const getStationDetails = (id: string, stationData: HideoutStation[], userStations: UserStationData[]) => {
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