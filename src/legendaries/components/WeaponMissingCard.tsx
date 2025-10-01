import {useEquipmentTabs, useItemsForCharacterEquipmentTabs} from '@/equipmentTabs/equipment-tabs-queries.ts'
import {useMemo} from 'react'
import {type CharacterEquipments} from '@/equipmentTabs/equipment-types.ts'
import {equipmentWeaponSlots} from '@/equipmentTabs/equipment-utils.ts'
import {type Item, ItemRarity, WeaponType} from '@/item/types.ts'
import {isWeapon} from '@/item/item-utils.ts'

export const WeaponMissingCard = () => {

    const tabQueries = useEquipmentTabs()

    // console.log('1: -- tabQueries', tabQueries?.map(query => !query.isLoading && query.data))

    const characterEquipments = useMemo(() => reduceCharacterEquipmentQueries(tabQueries), [tabQueries])

    // console.log('2: -- charcterEquipments', characterEquipments)

    const itemQueries = useItemsForCharacterEquipmentTabs(characterEquipments, equipmentWeaponSlots)

    // console.log('3: -- itemQueries', itemQueries?.map(query => !query.isLoading && query.data))

    const items: Item[] = itemQueries?.map(query => !query.isLoading && query.data) as Item[]

    const weaponEquipmentMap = useMemo(() => {
        const weaponCountMap = new Map<WeaponType, number>()

        //TODO: filter equipped weapons which could be replaced by legendaries
        // check if the account owns the legendary for this weapon type and if its already equipped in
        // another slot
        items.filter(isWeapon)
            .filter(w => w.rarity !== ItemRarity.LEGENDARY)
            .forEach((weapon) => {
                weaponCountMap.set(weapon.details.type, (weaponCountMap.get(weapon.details.type) ?? 0) + 1)
            })


        return weaponCountMap
    }, [items])

    console.log('equipment map', weaponEquipmentMap, Object.entries(weaponEquipmentMap))

    return (
        <div className={'flex flex-col bg-accent rounded-md w-full'}>
            {[...weaponEquipmentMap]
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                        <div key={type} className={'flex gap-2'}>
                            <p>{type}</p>
                            <p>{count}</p>
                        </div>
                    )
                )
            }
        </div>
    )
}

const reduceCharacterEquipmentQueries = (queries: ReturnType<typeof useEquipmentTabs>) => {
    return queries.reduce<CharacterEquipments[]>((equipmentArray: CharacterEquipments[], query) => {
        if (query.data) {
            equipmentArray.push(query.data)
        }

        return equipmentArray
    }, [])
}