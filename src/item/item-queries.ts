import {useQuery} from '@tanstack/react-query'

import {BASE_URL} from '../utils/api-utils.ts'

export const useLegendaries = () => useQuery({
    queryKey: ['legendaries'],
    queryFn: async () => fetch(`${BASE_URL}/legendaryarmory`)
        .then(res => res.json())
        .then(res => fetch(`${BASE_URL}/items?ids=${res}`).then(res => res.json()))
})

export const useItem = (itemId: number) => useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => fetch(`${BASE_URL}/items/${itemId}`),
})

export const useItems = (itemIdList: number[]) => useQuery({
    queryKey: ['items'],
    queryFn: async () => fetch(`${BASE_URL}/items?ids=${itemIdList}`).then(res => res.json()),
})