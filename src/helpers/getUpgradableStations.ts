import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";


export const getUpgradableStations = (data: HideoutStation[], stations: UserStationData[]) => {
    const filteredStations = stations.filter((userStation) => {
        // Get the station data
        const stationDetails = data.find((station) => station.id === userStation.id);

        if(!stationDetails || !stationDetails.levels) {
            return false;
        }

        // Get the current station level
        const currentLevel = userStation.level;

        // Find the next level the user can build (currentLevel + 1)

        const nextLevelDetails = stationDetails?.levels.find((level) => level.level === currentLevel+1);

        if(!nextLevelDetails) {
            return false;
        }

        // Check if the requirements are met for the next level
        const requirementsMet = nextLevelDetails.stationLevelRequirements.every((req) => {
            const requiredStation = stations.find((station) => station.id === req.station.id);
            return requiredStation && requiredStation.level >= req.level;
        })

        return requirementsMet;
    });

    return filteredStations;
}

