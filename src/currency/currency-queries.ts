import {BASE_URL} from '../utils/api-utils.ts'
import {useQuery} from '@tanstack/react-query'

export const useCurrencies = () => useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
        return await fetch(`${BASE_URL}/currencies`)
    },
})