import {createFileRoute} from '@tanstack/react-router'
import {useWvwRanks} from '../wvw/wvw-queries.ts'
import { useProfessions } from '@/profession/profession-queries.ts'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {

    // const wvwRankQuery = useWvwRanks()
    //
    // console.log('wvwRankQuery', wvwRankQuery)

    const {data: professions} = useProfessions()

    console.log('professions', professions)

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
        </div>
    )
}