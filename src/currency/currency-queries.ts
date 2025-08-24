import {useQuery} from 'react-query'

import {BASE_URL} from '../utils/api-utils.ts'

export const useCurrencies = () => useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
        return await fetch(`${BASE_URL}/currencies`)
    },
})