import {HideoutStation} from "@customTypes/hideout.ts";

export const fetchHideoutData = async (): Promise<HideoutStation[]> => {
    try {
        const response = await fetch('https://api.tarkov.dev/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                query: `
                  query {
                    hideoutStations {
                      id
                      name
                      imageLink
                      levels {
                        id
                        level
                        description
                        itemRequirements {
                          id
                          count
                          item {
                            id
                            name
                            iconLink
                          }
                        }
                        stationLevelRequirements {
                          id
                          station {
                            id
                            name
                            imageLink
                          }
                          level
                        }
                        skillRequirements {
                          id
                          name
                          level
                        }
                        traderRequirements {
                          id
                          trader {
                            id
                            name
                            imageLink
                          }
                          value
                        }
                      }
                    }
                  }
                `,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("Hideout API: ", result.data.hideoutStations);
        return result.data.hideoutStations; // Extract the hideoutStations
    } catch (error) {
        console.error('Error fetching hideout data:', error);
        return [];
    }
};
