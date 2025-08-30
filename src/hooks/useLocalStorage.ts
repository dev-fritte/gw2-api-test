import { useEffect, useState } from 'react'

export function getStorageValue<T>(key: string, defaultValue: T) {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : defaultValue
}

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue)
    })

    useEffect(() => {
        function handler(e: StorageEvent) {
            if (e.key !== key) {
                return
            }
            setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue)
        }

        window.addEventListener('storage', handler)

        return () => {
            window.removeEventListener('storage', handler)
        }
    }, [])

    const setValueWrap = (valueToSet: T) => {
        try {
            setValue(valueToSet)

            localStorage.setItem(key, JSON.stringify(valueToSet))
            if (typeof window !== 'undefined') {
                window.dispatchEvent(
                    new StorageEvent('storage', {key, newValue: JSON.stringify(valueToSet)}),
                )
            }
        } catch (e) {
            console.error(e)
        }
    }

    return [value, setValueWrap]
}
