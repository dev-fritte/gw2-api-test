import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '@/utils/api-utils.ts'
import type { Profession } from '@/profession/profession-types.ts'

export const useProfessions = () => {
    return useQuery({
        queryKey: ['professions'],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/professions?page=0`)
                .then(res => res.json())
                .then(res => res as Profession[])
        },
        gcTime: 1000 * 60 * 60
    })

}