import {useQueries, useQuery} from '@tanstack/react-query'

import {BASE_URL} from '../utils/api-utils.ts'
import {useApiKey} from '@/hooks/useApiKey.ts'
import type {Item, LegendaryItemWithCount} from '@/item/types.ts'

export const useLegendaries = () => useQuery<Item[]>({
    queryKey: ['legendaries'],
    queryFn: async () => fetch(`${BASE_URL}/legendaryarmory`)
        .then(res => res.json())
        .then(res => fetch(`${BASE_URL}/items?ids=${res}`).then(res => res.json())),
    gcTime: 1000 * 60 * 60,
})

export const useAccountLegendaries = () => {

    const apiKey = useApiKey()

    return useQuery<{ id: number, count: number }[]>({
        enabled: apiKey !== null,
        queryKey: ['account-legendaries'],
        queryFn: async () => fetch(`${BASE_URL}/account/legendaryarmory?access_token=${apiKey}`)
            .then(res => res.json()),
        gcTime: 1000 * 60 * 60,
    })
}

export const useAccountLegendaryItems = () => {
    const {data: accountLegendaries} = useAccountLegendaries()

    const legendaries = accountLegendaries ?? []

    return useQueries({
        queries: legendaries?.map(legendary => {
            return {
                queryKey: ['item', legendary.id],
                queryFn: async () => await fetch(`${BASE_URL}/items/${legendary.id}`)
                    .then(res => res.json())
                    .then(res => res as Item)
                    .then(res => ({item: res, count: legendary.count}) as LegendaryItemWithCount),
            }
        })
    })
}

export const useItem = (itemId: number) => useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => fetch(`${BASE_URL}/items/${itemId}`),
})

export const useItems = (itemIdList: number[]) => useQuery({
    queryKey: ['items', itemIdList],
    queryFn: async () => fetch(`${BASE_URL}/items?ids=${itemIdList}`).then(res => res.json()),
})