import {useQuery} from '@tanstack/react-query'

import {BASE_URL} from '../utils/api-utils.ts'

export const useDailies = () => useQuery({
    queryKey: ['dailies'],
    queryFn: async () => {
        return await fetch(`${BASE_URL}/achievements/daily`)
    },
})