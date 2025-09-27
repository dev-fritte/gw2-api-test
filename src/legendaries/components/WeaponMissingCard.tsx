import {useEquipmentTabs} from '@/equipmentTabs/equipment-tabs-queries.ts'

export const WeaponMissingCard = () => {

    const tabQueries = useEquipmentTabs()

    console.log('tabQueries', tabQueries)
    console.log('tabQueries', tabQueries?.map(query => !query.isLoading && query.data))

    return (
        <div className={'flex bg-accent rounded-md h-20 w-full'}>

        </div>
    )
}