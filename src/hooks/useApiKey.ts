import useLocalStorage from '@/hooks/useLocalStorage.ts'

export const useApiKey = () => {
    let [apiKey] = useLocalStorage<string | null>('apiKey', null)

    if (apiKey) {
        apiKey = apiKey.replaceAll('"', '')
    }

    return apiKey
}