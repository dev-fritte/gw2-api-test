import {useQuery} from '@tanstack/react-query'

import {BASE_URL} from '../utils/api-utils.ts'

export const useWvwRanks = () => useQuery({
    queryKey: ['wvw-rank'],
    queryFn: async () => {
        return await fetch(`${BASE_URL}/wvw/ranks`)
    },
})