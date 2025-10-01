import {useApiKey} from '@/hooks/useApiKey.ts'
import {useQueries, useQuery} from '@tanstack/react-query'
import {BASE_URL} from '@/utils/api-utils.ts'
import type {Character} from '@/character/character-types.ts'
import {useCharacter, useCharacters} from '@/character/character-queries.ts'
import {type CharacterEquipments, EquipmentSlot, type EquipmentTab} from '@/equipmentTabs/equipment-types.ts'
import type {Item} from '@/item/types.ts'

export const useEquipmentTabs = () => {

    const apiKey = useApiKey()
    const {data} = useCharacters()

    const characters = data?.filter(char => !!char) ?? []

    return useQueries({
        queries: characters.filter(char => char?.name).map(char => {
            return {
                queryKey: ['equipment-tabs', 'character', char.name],
                queryFn: async () => {
                    return await fetch(`${BASE_URL}/characters/${char.name}/equipmenttabs?tabs=all&access_token=${apiKey}`)
                        .then(res => res.json())
                        .then(res => res as EquipmentTab[])
                        .then(equipment => ({
                            character: char,
                            equipmentTabs: equipment
                        }) as CharacterEquipments)
                },
                gcTime: 1000 * 60 * 10
            }
        })
    })
}

//maybe split this to use /items/ids=[...] endpoint.
export const useItemsForCharacterEquipmentTabs = (characterEquipments: CharacterEquipments[], slotFilter?: EquipmentSlot[]) => {
    return useQueries<Item[]>({
        queries: characterEquipments.reduce<EquipmentTab[]>((equipmentArray, {equipmentTabs}) => {
            equipmentTabs.forEach(e => equipmentArray.push(e))
            return equipmentArray
        }, []).reduce<number[]>((itemArray: number[], equipmentTab) => {
            equipmentTab.equipment.filter(e => {
                if (!slotFilter || slotFilter?.includes(e.slot)) {
                    return e
                }

                return null

            }).forEach(e => itemArray.push(e.id))

            return itemArray

        }, []).map((itemId) => {
            return {
                queryKey: ['equipment-items', itemId],
                queryFn: async () => {
                    return await fetch(`${BASE_URL}/items/${itemId}`)
                        .then(res => res.json())
                        .then(res => res as Item)
                },
                gcTime: 1000 * 60 * 5,
            }
        })
    })
}

export const useEquipmentTabsOfCharacter = (name: string) => {

    const apiKey = useApiKey()
    const character = useCharacter(name)

    return useQuery({
        enabled: apiKey !== null && !!character,
        queryKey: ['equipment-tabs', 'character', name],
        queryFn: async () => {
            return await fetch(`${BASE_URL}/characters/${name}?access_token=${apiKey}`)
                .then(res => res.json())
                .then(res => res as Character[])
        },
        gcTime: 1000 * 60 * 5
    })
}