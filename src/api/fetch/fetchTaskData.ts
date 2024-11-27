import {Task} from "@customTypes/quest.ts";

export const fetchTaskData = async (): Promise<Task[]> => {
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
                    tasks {
                        id
                        name
                        trader {
                            id
                            name
                            imageLink
                        }
                        objectives {
                            id
                            type
                            description
                            maps {
                                id
                                name
                            }
                            optional
                            ... on TaskObjectiveBuildItem {
                                id
                                item {
                                    id
                                    types
                                    name
                                    image512pxLink
                                    backgroundColor
                                }
                            }
                            ... on TaskObjectiveMark {
                                id
                                markerItem {
                                    id
                                    types
                                    name
                                    image512pxLink
                                    backgroundColor
                                }
                            }
                            ... on TaskObjectiveQuestItem {
                                id
                                count
                                requiredKeys {
                                    id
                                    types
                                    name
                                    backgroundColor
                                }
                            }
                            ... on TaskObjectiveItem {
                                id
                                type
                                count
                                items {
                                    id
                                    name
                                    types
                                    image512pxLink
                                    backgroundColor
                                    wikiLink
                                }
                                foundInRaid
                                maxDurability
                                minDurability
                                requiredKeys {
                                    id
                                    name
                                }
                            }
                        }
                        taskRequirements {
                            task {
                                id
                                name
                            }
                        }
                        traderRequirements {
                            id
                            trader {
                                name
                            }
                            requirementType
                        }
                        minPlayerLevel
                        experience
                        kappaRequired
                        lightkeeperRequired
                        wikiLink
                    }
                }
            `}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("TASK API: ", result.data.tasks);
        return result.data.tasks; // Extract the hideoutStations
    } catch (error) {
        console.error('Error fetching hideout data:', error);
        return [];
    }
};