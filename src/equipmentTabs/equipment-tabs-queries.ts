import {useApiKey} from '@/hooks/useApiKey.ts'
import {useQueries, useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@/utils/api-utils.ts'
import type {Character} from '@/character/character-types.ts'
import {useCharacter, useCharacters} from '@/character/character-queries.ts'

export const useEquipmentTabs = () => {

    const apiKey = useApiKey();
    const {data} = useCharacters();

    const characters = data?.filter(char => !!char) ?? [];

    return useQueries({
        queries: characters.map(char => {
            return {
                queryKey: ['equipment-tabs', 'character', char.name],
                queryFn: async () => {
                    return await fetch(`${BASE_URL}/characters/${char.name}/equipmenttabs?tabs=all&access_token=${apiKey}`)
                        .then(res => res.json())
                        .then(res => res as Character[])
                },
                gcTime: 1000 * 60 * 10
            }
        })
    })
}

export const useEquipmentTabsOfCharacter = (name: string) => {

    const apiKey = useApiKey();
    const character = useCharacter(name);

    return useQuery({
        enabled: apiKey !== null && !!character,
        queryKey: ['equipment-tabs', 'character', name],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/characters/${name}?access_token=${apiKey}`)
                .then(res => res.json())
                .then(res => res as Character[])
        },
        gcTime: 1000 * 60 * 5
    })
}