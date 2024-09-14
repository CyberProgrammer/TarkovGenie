import VisitIcon from '@icons/task_objectives/visit.svg';
import GiveIcon from '@icons/task_objectives/give.svg';
import Eliminate from '@icons/task_objectives/kill.svg';
import FindIcon from '@icons/task_objectives/find.svg';
import MarkIcon from '@icons/task_objectives/mark.svg';
import SkillIcon from '@icons/task_objectives/skill.svg';
import ExperienceIcon from '@icons/task_objectives/skill2.svg';
import ExtractIcon from '@icons/task_objectives/extract.svg';
import BuildIcon from '@icons/task_objectives/buildWeapon.svg';
import PlantIcon from '@icons/task_objectives/place.svg';
import MiscIcon from '@icons/task_objectives/misc.svg';

const getObjectiveTypeIcon = (objectiveType: string): string => {

    switch (objectiveType) {
        case 'extract':
            return ExtractIcon;

        case 'visit':
            return VisitIcon;

        case 'giveItem':
            return GiveIcon;

        case 'shoot':
            return Eliminate;

        case 'findQuestItem':
            return FindIcon;

        case 'giveQuestItem':
            return GiveIcon;

        case 'findItem':
            return FindIcon;

        case 'buildWeapon':
            return BuildIcon;

        case 'plantItem':
            return PlantIcon;

        case 'experience':
            return ExperienceIcon;

        case 'skill':
            return SkillIcon;

        case 'plantQuestItem':
            return PlantIcon;

        case 'mark':
            return MarkIcon;

        case 'taskStatus':
            return MiscIcon;

        case 'traderLevel':
            return ExperienceIcon;

        case 'useItem':
            return MiscIcon;

        case 'sellItem':
            return MiscIcon;

        case 'traderStanding':
            return MiscIcon;

        default:
            return 'Objective not recognized';
    }
};

export default getObjectiveTypeIcon;