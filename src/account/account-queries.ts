import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '@/utils/api-utils.ts'
import type { AccountInfo } from '@/account/account-types.ts'
import { useApiKey } from '@/hooks/useApiKey.ts'

export const useAccount = () => {

    const apiKey = useApiKey()

    return useQuery({
        enabled: apiKey !== null,
        queryKey: ['account'],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/account?access_token=${apiKey}`)
                .then(res => res.json())
                .then(res => res as AccountInfo)
        },
        staleTime: 1000 * 60 * 5,
    })
}