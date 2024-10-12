export interface Trader {
    id: string;
    name: string;
    imageLink: string;
}

export interface Map {
    id: string;
    name: string;
}

export interface Key {
    id: string;
    name: string;
}

export interface TaskRequirement {
    task: {
        id: string;
        name: string;
    };
}

export interface TraderRequirement {
    id: string;
    trader: {
        name: string;
    };
    requirementType: string;
}

export interface TaskObjectiveItem{
    id: string;
    name: string;
    types: string[];
    image512pxLink: string;
    backgroundColor: string;
    wikiLink?: string;
}

export interface BuildWeaponObjective{
    id: string;
    name: string;
    types: string[];
    image512pxLink: string;
    backgroundColor: string;
    wikiLink?: string;
}

export interface TaskObjective {
    id: string;
    type: string;
    description: string;
    count?: number;
    maps: Map[];
    optional: boolean;
    requiredKeys?: Key[][] | null;
    items?: TaskObjectiveItem[];
    item?: BuildWeaponObjective;
    foundInRaid?: boolean;
    maxDurability?: number;
    minDurability?: number;
}

export interface Task {
    id: string;
    name: string;
    trader: Trader;
    objectives: TaskObjective[];
    taskRequirements: TaskRequirement[];
    traderRequirements: TraderRequirement[];
    minPlayerLevel: number;
    experience: number;
    kappaRequired: boolean;
    lightkeeperRequired: boolean;
    wikiLink: string;
}
