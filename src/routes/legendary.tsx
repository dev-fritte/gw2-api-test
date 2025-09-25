import {createFileRoute} from '@tanstack/react-router'
import {useAccountLegendaries, useLegendaries} from '@/item/item-queries.ts'
import {ItemPreview} from '@/item/components/ItemPreview.tsx'

import {type Item} from '@/item/types.ts'
import {type ItemTypeFilterValue, ItemTypeSelect} from '@/item/components/ItemTypeSelect.tsx'
import {useMemo, useState} from 'react'
import {filterByItemType} from '@/item/item-utils.ts'

export const Route = createFileRoute('/legendary')({
    component: RouteComponent,
})

function RouteComponent() {

    const [itemTypeFilter, setItemTypeFilter] = useState<ItemTypeFilterValue | null>(null)

    const {data: legendaries} = useLegendaries()
    const {data: accountLegendaries} = useAccountLegendaries()

    // console.log('legendaries', legendaries, accountLegendaries)

    const legendariesFiltered = useMemo(() =>
            filterByItemType(legendaries, itemTypeFilter)
        ,[legendaries, itemTypeFilter])

    console.log('legendaryes', legendariesFiltered)

    return (
        <div className={'flex flex-col gap-6 p-5'}>
            <h1 className={'text-2xl'}>Legendary Items</h1>

            <div className={'flex flex-col gap-2 p-2 bg-accent rounded-md'}>
                <div className={'flex gap-2'}>
                    <p>Unlocked: </p>
                    <p>{`${accountLegendaries?.length}/${legendaries?.length}`}</p>
                </div>
            </div>

            <ItemTypeSelect onChange={setItemTypeFilter}/>

            <div className={'flex flex-wrap gap-2'}>
                {legendariesFiltered?.map((leggy: Item) => {

                        const unlocked = accountLegendaries?.find(l => l.id === leggy.id)
                        return <ItemPreview key={leggy.id} item={leggy}
                                            unlocked={!!unlocked}
                                            amount={unlocked && String(unlocked?.count)}
                        />
                    }
                )}
            </div>
        </div>
    )
}
