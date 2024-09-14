export interface Trader {
    id: string;
    name: string;
    imageLink: string;
}

export interface Map {
    id: string;
    name: string;
}

export interface Item {
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

export interface TaskObjectiveQuestItem {
    id: string;
    type: string;
    description: string;
    maps: Map[];
    optional: boolean;
    requiredKeys: Item[];
}

export interface TaskObjective {
    id: string;
    type: string;
    description: string;
    maps: Map[];
    optional: boolean;
}

export interface Task {
    id: string;
    name: string;
    trader: Trader;
    objectives: (TaskObjective | TaskObjectiveQuestItem)[];
    taskRequirements: TaskRequirement[];
    traderRequirements: TraderRequirement[];
    minPlayerLevel: number;
    experience: number;
    kappaRequired: boolean;
    lightkeeperRequired: boolean;
    wikiLink: string;
}
