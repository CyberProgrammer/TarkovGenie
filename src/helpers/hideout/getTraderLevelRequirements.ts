import {HideoutStation, UserStationData} from "@customTypes/hideout.ts";

export const getTraderLevelRequirements = (id:string, stationData: HideoutStation[], userStations: UserStationData[]) => {
    const userStation = userStations.find((station) => station.id === id);

    const errorMessage = [{
        "id": "-1",
        "value": "-1",
        "trader":{
            "name": "Error finding trader requirement",
            "imageLink": ""
        }
    }]

    const noRequirement = [{
        "id": "-2",
        "value": "-2",
        "trader":{
            "name": "No requirement",
            "imageLink": ""
        }
    }]

    if(!userStation){
        console.error("User station (", id, ") not found in user data");
        return errorMessage;
    }

    // Check for level 0
    if(userStation.level == 0){
        return noRequirement;
    }

    const stationInfo = stationData.find((station) => station.id === id);

    // Make sure station info if valid
    if (!stationInfo || !stationInfo.levels) {
        console.error("Station (", id, ") not found in station data");
        return errorMessage;
    }

    const userStationLevel = userStation.level;

    // Ensure there is a valid level in stationInfo.levels
    if (!stationInfo.levels[userStationLevel - 1]) {
        console.error("Level data not found for station (", id, ") at user level (", userStationLevel, ")");
        return errorMessage;
    }

    const traderRequirements = stationInfo.levels[userStationLevel - 1].traderRequirements;

    // Check for any requirements
    if(traderRequirements.length === 0){
        return noRequirement;
    }

    return traderRequirements;
}