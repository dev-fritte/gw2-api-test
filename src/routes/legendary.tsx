import {createFileRoute} from '@tanstack/react-router'
import {useLegendaries} from '@/item/item-queries.ts'
import {ItemPreview} from '@/item/components/ItemPreview.tsx'
import type {Item} from '@/item/types.ts'

export const Route = createFileRoute('/legendary')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: legendaries} = useLegendaries()

    console.log('legendaries', legendaries)

    return (
        <div className={'p-5'}>
            <h1>Legendary Items</h1>
            <div className={'flex flex-wrap gap-2'}>
                {legendaries?.map((leggy: Item) => <ItemPreview key={leggy.id} item={leggy}/>)}
            </div>
        </div>
    )
}
