import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input.tsx'
import useLocalStorage from '@/hooks/useLocalStorage.ts'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/account')({
    component: RouteComponent,
})

function RouteComponent() {

    const [apiKey, setApiKey] = useLocalStorage<string | null>('apiKey', null)
//TODO: add react hook form

    const saveApiKey = (event) => () => {
        console.log('test')
        console.log('save api key', event.element.value);
        setApiKey(event.element.value);
    }

    return <div className={'flex flex-col gap-10 p-10'}>
        <h1>Account</h1>
        <div className={'flex flex-col gap-10'}>
            <Input className={'w-80'} placeholder={'API Key'} value={apiKey ?? undefined}/>
            <Button onClick={(e) => {
                console.log('save api key', e);
                saveApiKey(e)
            }}>
                Save
            </Button>
        </div>
    </div>
}
