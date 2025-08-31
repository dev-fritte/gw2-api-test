import { ProfessionEnum } from '@/character/character-types.ts'

export const getProfessionColor = (profession: ProfessionEnum) => {

    switch (profession) {
        case ProfessionEnum.WARRIOR:
            return '#FFD166'
        case ProfessionEnum.MESMER:
            return '#B679D5'
        case ProfessionEnum.ELEMENTALIST:
            return '#F68A87'
        case ProfessionEnum.ENGINEER:
            return '#D09C59'
        case ProfessionEnum.RANGER:
            return '#8EDF44'
        case ProfessionEnum.THIEF:
            return '#C08F95'
        case ProfessionEnum.REVENANT:
            return '#D16E5A'
        case ProfessionEnum.GUARDIAN:
            return '#72C1D9'
        case ProfessionEnum.NECROMANCER:
            return '#52A76F'
    }
}