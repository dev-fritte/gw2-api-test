import {type Character, ProfessionEnum} from '@/character/character-types.ts'
import {useProfessions} from '@/profession/profession-queries.ts'
import {getProfessionColor} from '@/profession/profession-utils.ts'
import dayjs from 'dayjs'

type CharacterCardProps = {
    character: Character;
}

export const CharacterCard = ({character}: CharacterCardProps) => {

    const {data: professionData} = useProfessions()

    const getProfessionIcon = (profession: ProfessionEnum) => {
        const found = professionData?.find(professionData => professionData.id === profession)

        return found?.icon
    }

    const characterAge = (character?.age / 3600).toFixed(1)
    // console.log('profession', character, getProfessionColor(character.profession))

    return (
        <div className={`w-72 h-80 flex flex-col justify-between gap-2 p-4 shadow-xl rounded-md`}
             style={{backgroundColor: `${getProfessionColor(character?.profession)}44`}}>

            <div>
                <div className={'flex justify-between'}>
                    <h3>{character.name}</h3>
                    <div className={'flex flex-col justify-center items-center'}>
                        <img src={getProfessionIcon(character.profession)} alt={'profession icon'}/>
                        <p>{character.level}</p>
                    </div>
                </div>
                <div className={'flex gap-2'}>
                    <p>Age:</p>
                    <p>{`${characterAge} Hours`}</p>
                </div>
                <div className={'flex gap-2'}>
                    <p>Deaths:</p>
                    <p>{character.deaths}</p>
                </div>
            </div>

            <div className={'flex gap-2'}>
                <p>Created:</p>
                <p>{dayjs(character.created).format('MMMM YYYY')}</p>
            </div>
        </div>
    )
}