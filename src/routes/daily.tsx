import {createFileRoute} from '@tanstack/react-router'
import {useDailies} from '@/achievements/dailies-queries.ts'

export const Route = createFileRoute('/daily')({
    component: RouteComponent,
})

function RouteComponent() {

    const {data: dailies} = useDailies()

    console.log('dailies', dailies)

    return (
        <div className={'flex flex-1 p-5'}>
            <h1>Daily Achievements</h1>
        </div>
    )
}
