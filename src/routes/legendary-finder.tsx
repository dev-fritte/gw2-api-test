import {createFileRoute} from '@tanstack/react-router'
import {WeaponMissingCard} from '@/legendaries/components/WeaponMissingCard.tsx'
import {useCharacters} from '@/character/character-queries.ts'
import {CharacterTable} from '@/character/components/CharacterTable.tsx'
import {useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui/button.tsx'
import type {OnChangeFn, RowSelectionState} from '@tanstack/react-table'

export const Route = createFileRoute('/legendary-finder')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: characters, isLoading: charactersLoading} = useCharacters()
    const [characterSelection, setCharacterSelection] = useState<RowSelectionState>({})
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (!characters) return
        const selection: RowSelectionState = characters.reduce((result, _, index) => ({
            ...result,
            [`${index}`]: true
        }), {})
        setCharacterSelection(selection)
    }, [characters])

    // Sort matches CharacterTable's internal sort so row indices align with selection keys
    const selectedCharacters = useMemo(() => {
        if (!characters) return []
        return characters
            .toSorted((a, b) => b.age - a.age)
            .filter((_, index) => characterSelection[String(index)])
    }, [characters, characterSelection])

    const handleSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
        setCharacterSelection(prev =>
            typeof updater === 'function' ? updater(prev) : updater
        )
        setStarted(false)
    }

    const selectedCount = selectedCharacters.length

    return (
        <div className={'flex flex-col gap-6 p-5 max-w-2xl'}>
            <h1 className={'text-2xl'}>Legendary Finder</h1>

            <CharacterTable
                characters={characters}
                isLoading={charactersLoading}
                rowSelection={characterSelection}
                onSelectionChange={handleSelectionChange}
            />

            {!started ? (
                <Button
                    onClick={() => setStarted(true)}
                    disabled={selectedCount === 0 || charactersLoading}
                >
                    Start calculation ({selectedCount} {selectedCount === 1 ? 'character' : 'characters'} selected)
                </Button>
            ) : (
                <WeaponMissingCard characters={selectedCharacters}/>
            )}
        </div>
    )
}
