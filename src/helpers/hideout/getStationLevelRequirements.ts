import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";

export const getStationLevelRequirements = (id: string, stationData: HideoutStation[], userStations: UserStationData[]) => {
    if(stationData.length == 0)
        return [];

    const stationDetails = stationData.find((station) => station.id === id);
    const stationLevel = userStations.find((station) => station.id === id)?.level;

    if (!stationDetails || stationDetails.levels === undefined || stationLevel === undefined) {
        console.error(`Station details or level not found for station ID: ${id}`);
        return [];
    }

    const requirements = stationDetails.levels[stationLevel];

    if (!requirements) {
        console.error(`No requirements found for station ID: ${id}, level: ${stationLevel}`);
        return [];
    }

    // Filter out own station requirement
    return requirements.stationLevelRequirements.filter((requirement) => requirement.station.id !== id);
}