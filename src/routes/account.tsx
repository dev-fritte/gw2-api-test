import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input.tsx'
import useLocalStorage from '@/hooks/useLocalStorage.ts'
import { Button } from '@/components/ui/button.tsx'
import { Form, useForm } from 'react-hook-form'

export const Route = createFileRoute('/account')({
    component: RouteComponent,
})

type FormData = {
    apiKey: string;
}

function RouteComponent() {

    const [apiKey, setApiKey] = useLocalStorage<string | null>('apiKey', null)
    const form = useForm<FormData>({
        defaultValues: {
            apiKey: apiKey ?? '',
        }
    })

    const saveApiKey = (data: FormData) => {
        setApiKey(data.apiKey)
    }

    return <div className={'flex flex-col gap-10 p-10'}>
        <h1>Account</h1>
        <div className={'flex flex-col gap-10'}>
            <Form control={form.control}
                  onSubmit={({data}) => saveApiKey(data)}
                  className={'flex flex-col gap-4'}>
                <Input className={'w-80'} placeholder={'API Key'} {...form.register('apiKey')}/>
                <Button type={'submit'}>
                    Save
                </Button>
            </Form>
        </div>
    </div>
}
