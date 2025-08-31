import { type Character, ProfessionEnum } from '@/character/character-types.ts'
import { useProfessions } from '@/profession/profession-queries.ts'

type CharacterCardProps = {
    character: Character;
}

export const CharacterCard = ({character}: CharacterCardProps) => {

    const {data: professionData} = useProfessions()

    const getProfessionIcon = (profession: ProfessionEnum) => {
        const found = professionData?.find(professionData => professionData.id === profession)

        console.log('found', found)

        return found?.icon;
    }

    const characterAge = (character?.age / 3600).toFixed(1);

    return (
        <div className={'w-72 h-80 flex flex-col gap-2 p-4 shadow-xl bg-gray-200 rounded-md'}>
            <div className={'flex justify-between'}>
                <h3>{character.name}</h3>
                <div className={'flex flex-col justify-center items-center'}>
                    <img src={getProfessionIcon(character.profession)} />
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
    )
}