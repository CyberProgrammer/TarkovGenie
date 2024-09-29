export interface UserStationData {
    id: string;
    name: string;
    level: number;
}

export interface HideoutStation {
    id: string;
    name?: string;
    levels?: HideoutStationLevel[];
    imageLink?: string;
}

interface HideoutStationLevel {
    id: string;
    level: number;
    description: string;
    skillRequirements: SkillRequirement[];
    itemRequirements: ItemRequirement[];
    stationLevelRequirements: HideoutStationPrerequisite[];
    traderRequirements: TraderRequirement[];
}

export interface Item{
    id: string;
    name: string;
    iconLink: string;
}

export interface HideoutStationPrerequisite{
    id: string;
    station: HideoutStation;
    level: number;
}

interface SkillRequirement {
    id: string;
    name: string;
    level: number;
}

interface ItemRequirement {
    id: string;
    count: number;
    item: {
        id: string;
        name: string;
        iconLink: string;
    };
}
export interface TraderRequirement{
    id: string;
    trader: Trader;
    value: number
}

export interface Trader {
    id: string;
    name: string;
}