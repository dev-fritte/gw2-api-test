import {createFileRoute} from '@tanstack/react-router'
import {WeaponMissingCard} from '@/legendaries/components/WeaponMissingCard.tsx'
import {useCharacters} from '@/character/character-queries.ts'
import {CharacterTable} from '@/character/components/CharacterTable.tsx'
import {useEffect, useState} from 'react'

export const Route = createFileRoute('/legendary-finder')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: characters, isLoading: charactersLoading} = useCharacters();
    const [characterSelection, setCharacterSelection] = useState<Record<string, boolean>>({})

    console.log(characterSelection)

    //TODO: fix selection type and auto-select everything when characters are loaded

    // useEffect(() => {
    //     if(!characters) {
    //         return
    //     }
    //
    //     const selection: Record<string, boolean> = characters.map((_, index) => ({[String(index)]: true}))
    //     setCharacterSelection(selection);
    // }, [characters])

    if(charactersLoading) {
        return 'Loading...'
    }

    return (
        <div className={'flex flex-col gap-6 p-5'}>
            <h1 className={'text-2xl'}>Legendary Finder</h1>

            <CharacterTable characters={characters} rowSelection={characterSelection} onSelectionChange={setCharacterSelection} />

            <WeaponMissingCard/>

        </div>
    )
}
