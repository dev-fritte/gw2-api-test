import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '@/utils/api-utils.ts'
import { useApiKey } from '@/hooks/useApiKey.ts'
import type { Character } from '@/character/character-types.ts'

export const useCharacters = () => {

    const apiKey = useApiKey()

    return useQuery({
        enabled: apiKey !== null,
        queryKey: ['characters'],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/characters?page=0&access_token=${apiKey}`)
                .then(res => res.json())
                .then(res => res as Character[])
        },
    })
}