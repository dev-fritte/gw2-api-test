import {useEquipmentTabs, useItemsForCharacterEquipmentTabs} from '@/equipmentTabs/equipment-tabs-queries.ts'
import {useMemo} from 'react'
import {type CharacterEquipments} from '@/equipmentTabs/equipment-types.ts'
import {equipmentWeaponSlots} from '@/equipmentTabs/equipment-utils.ts'
import {type Item, ItemRarity, type Weapon, WeaponType} from '@/item/types.ts'
import {getWeaponTypeIconUrl, isWeapon} from '@/item/item-utils.ts'
import {useAccountLegendaryItems} from '@/item/item-queries.ts'
import type {Character} from '@/character/character-types.ts'

const ICON_SIZE = 40;

type WeaponMissingCardProps = {
    characters: Character[]
}

export const WeaponMissingCard = ({characters}: WeaponMissingCardProps) => {

    const accountLegendaryQueries = useAccountLegendaryItems()
    const tabQueries = useEquipmentTabs(characters)

    // console.log('1: -- tabQueries', tabQueries?.map(query => !query.isLoading && query.data))

    const characterEquipments = useMemo(() => reduceCharacterEquipmentQueries(tabQueries), [tabQueries])

    // console.log('2: -- characterEquipments', characterEquipments)

    const itemQueries = useItemsForCharacterEquipmentTabs(characterEquipments, equipmentWeaponSlots)

    console.log('3: -- itemQueries', itemQueries?.map(query => !query.isLoading && query.data))

    const items: Item[] = itemQueries?.map(query => !query.isLoading && query.data) as Item[]

    const accountLegendaryMap = useMemo(() => {
        const legendaryTypeMap = new Map<WeaponType, number>()

        accountLegendaryQueries
            .map(query => query?.data)
            .filter((legend) => legend && isWeapon(legend?.item))
            .forEach((legend) => {
                legendaryTypeMap.set((legend?.item as Weapon).details.type, (legendaryTypeMap.get((legend?.item as Weapon).details.type) ?? 0) + 1)
            })

        return legendaryTypeMap

    }, [accountLegendaryQueries])

    const weaponEquipmentMap = useMemo(() => {
        const weaponCountMap = new Map<WeaponType, number>()

        //TODO: filter equipped weapons which could be replaced by legendaries
        // check if the account owns the legendary for this weapon type and if its already equipped in
        // another slot
        items.filter(isWeapon)
            .filter(w => w.rarity !== ItemRarity.LEGENDARY)
            .filter(w => !accountLegendaryMap.has(w.details.type)) // need to be filtered in equipment tabs
            .forEach((weapon) => {
                weaponCountMap.set(weapon.details.type, (weaponCountMap.get(weapon.details.type) ?? 0) + 1)
            })


        return weaponCountMap
    }, [items, accountLegendaryMap])

    console.log('equipment map', weaponEquipmentMap, Object.entries(weaponEquipmentMap))

    if (!weaponEquipmentMap) {
        return (
            <div className={'flex flex-col bg-accent rounded-md w-full h-10'}/>
        )
    }

    return (
        <div className={'flex flex-col bg-accent rounded-md w-full gap-1'}>
            {[...weaponEquipmentMap]
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                        <div key={type} className={'flex gap-2 items-center'}>
                            <img src={getWeaponTypeIconUrl(type)} alt={`weapon type icon ${type}`} width={ICON_SIZE} height={ICON_SIZE} />
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