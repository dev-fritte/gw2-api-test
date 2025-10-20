import {createFileRoute} from '@tanstack/react-router'
import {WeaponMissingCard} from '@/legendaries/components/WeaponMissingCard.tsx'
import {useCharacters} from '@/character/character-queries.ts'
import {CharacterTable} from '@/character/components/CharacterTable.tsx'

export const Route = createFileRoute('/legendary-finder')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: characters, isLoading: charactersLoading} = useCharacters();

    console.log('characters', characters)

    if(charactersLoading) {
        return 'Loading...'
    }

    return (
        <div className={'flex flex-col gap-6 p-5'}>
            <h1 className={'text-2xl'}>Legendary Finder</h1>

            <CharacterTable characters={characters} />

            <WeaponMissingCard/>

        </div>
    )
}
