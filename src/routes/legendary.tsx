import {createFileRoute} from '@tanstack/react-router'
import {useAccountLegendaries, useLegendaries} from '@/item/item-queries.ts'
import {ItemPreview} from '@/item/components/ItemPreview.tsx'
import type {Item} from '@/item/types.ts'

export const Route = createFileRoute('/legendary')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: legendaries} = useLegendaries()
    const {data: accountLegendaries} = useAccountLegendaries()

    console.log('legendaries', legendaries, accountLegendaries)



    return (
        <div className={'flex flex-col gap-6 p-5'}>
            <h1>Legendary Items</h1>
            <div className={'flex flex-wrap gap-2'}>
                {legendaries?.map((leggy: Item) => <ItemPreview key={leggy.id} item={leggy}
                                                                unlocked={!!accountLegendaries?.find(l => l.id === leggy.id)}/>)}
            </div>
        </div>
    )
}
