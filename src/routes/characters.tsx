import { createFileRoute } from '@tanstack/react-router'
import { useCharacters } from '@/character/character-queries.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { CharacterCard } from '@/character/components/CharacterCard.tsx'

export const Route = createFileRoute('/characters')({
    component: RouteComponent,
})

function RouteComponent() {
    const {data: characters, isLoading} = useCharacters()

    return (
        <div className={'flex flex-col gap-4 p-4'}>
            <h1>Characters</h1>
            {isLoading ?
                (
                    <div className={'flex flex-col gap-2'}>
                        <Skeleton key={'skeleton-1'}/>
                        <Skeleton key={'skeleton-2'}/>
                    </div>
                )
                : (
                    <div className={'flex gap-3 flex-wrap'}>
                        {characters?.sort((a, b) => b.age - a.age)
                            .map((character) => <CharacterCard key={character?.name} character={character}/>)}
                    </div>
                )
            }
        </div>
    )
}
