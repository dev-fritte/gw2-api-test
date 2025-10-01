import {useEquipmentTabs, useItemsForCharacterEquipmentTabs} from '@/equipmentTabs/equipment-tabs-queries.ts'
import {useMemo} from 'react'
import {type CharacterEquipments} from '@/equipmentTabs/equipment-types.ts'
import {equipmentWeaponSlots} from '@/equipmentTabs/equipment-utils.ts'

export const WeaponMissingCard = () => {

    const tabQueries = useEquipmentTabs()

    console.log('1: -- tabQueries', tabQueries?.map(query => !query.isLoading && query.data))

    const characterEquipments = useMemo(() => reduceCharacterEquipmentQueries(tabQueries), [tabQueries])

    console.log('2: -- charcterEquipments', characterEquipments)

    const itemQueries = useItemsForCharacterEquipmentTabs(characterEquipments, equipmentWeaponSlots)

    console.log('3: -- itemQueries', itemQueries?.map(query => !query.isLoading && query.data))

    // const legendaryEquipmentMap = useMemo(() => {
    //     return groupAndCountEquipmentByItemType()
    // }, [tabQueries])


    return (
        <div className={'flex bg-accent rounded-md h-20 w-full'}>

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