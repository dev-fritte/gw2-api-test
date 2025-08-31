import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '@/utils/api-utils.ts'

export const useSpecializations = () => {

    return useQuery({
        queryKey: ['specializations'],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/specializations?ids=all`)
                .then(res => res.json())
                .then(res => res)
        },
        gcTime: 1000 * 60 * 5,
    })
}