import { useAccount } from '@/account/account-queries.ts'
import dayjs from 'dayjs'
import { Skeleton } from '@/components/ui/skeleton.tsx'


export const AccountInfo = () => {

    const {data: accountData, isLoading} = useAccount()

    if (isLoading) {
        return (
            <div className={'flex flex-col gap-2'}>
                <Skeleton className={'w-60 h-4'}/>
                <Skeleton className={'w-60 h-4'}/>
                <Skeleton className={'w-60 h-4'}/>
            </div>
        )
    }

    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex gap-2'}>
                <h2>Accountname:</h2>
                <p>{accountData?.name}</p>
            </div>

            <div className={'flex gap-2'}>
                <h2>Created:</h2>
                <p>{accountData?.created && dayjs(accountData?.created).format('DD.MM.YYYY' +
                    ' HH:mm')}</p>
            </div>

            <div className={'flex gap-2'}>
                <h2>Fraktal Level:</h2>
                <p>{accountData?.fractal_level}</p>
            </div>
        </div>
    )
}