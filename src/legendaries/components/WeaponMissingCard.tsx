import {useEquipmentTabs, useItemsForCharacterEquipmentTabs} from '@/equipmentTabs/equipment-tabs-queries.ts'
import {useMemo} from 'react'
import {type CharacterEquipments} from '@/equipmentTabs/equipment-types.ts'
import {equipmentWeaponSlots} from '@/equipmentTabs/equipment-utils.ts'
import {type Item, ItemRarity, type Weapon, type WeaponType} from '@/item/types.ts'
import {getWeaponTypeIconUrl, isWeapon} from '@/item/item-utils.ts'
import {useAccountLegendaryItems} from '@/item/item-queries.ts'
import type {Character} from '@/character/character-types.ts'
import {Skeleton} from '@/components/ui/skeleton.tsx'

const ICON_SIZE = 36
const SKELETON_ROWS = 5

type WeaponResult = [WeaponType, Set<string>]

type WeaponMissingCardProps = {
    characters: Character[]
}

export const WeaponMissingCard = ({characters}: WeaponMissingCardProps) => {
    const accountLegendaryQueries = useAccountLegendaryItems()
    const tabQueries = useEquipmentTabs(characters)
    const characterEquipments = useMemo(() => resolveCharacterEquipments(tabQueries), [tabQueries])
    const itemQueries = useItemsForCharacterEquipmentTabs(characterEquipments, equipmentWeaponSlots)

    const isLoading =
        tabQueries.some(q => q.isLoading) ||
        itemQueries.some(q => q.isLoading) ||
        accountLegendaryQueries.some(q => q.isLoading)

    const itemById = useMemo(() => {
        const map = new Map<number, Item>()
        itemQueries.forEach(q => {
            if (q.data) map.set(q.data.id, q.data)
        })
        return map
    }, [itemQueries])

    const accountLegendaryTypes = useMemo(() => {
        const types = new Set<WeaponType>()
        accountLegendaryQueries
            .map(q => q.data)
            .filter((legend): legend is NonNullable<typeof legend> => !!legend && isWeapon(legend.item))
            .forEach(legend => types.add((legend.item as Weapon).details.type))
        return types
    }, [accountLegendaryQueries])

    const results = useMemo(
        () => buildWeaponCharacterMap(characterEquipments, itemById, accountLegendaryTypes),
        [characterEquipments, itemById, accountLegendaryTypes]
    )

    return (
        <div className={'flex flex-col gap-3'}>
            <h2 className={'text-lg font-semibold'}>Results</h2>
            <WeaponResultContent isLoading={isLoading} results={results}/>
        </div>
    )
}

// --- Sub-components ---

type WeaponResultContentProps = {
    isLoading: boolean
    results: WeaponResult[]
}

const WeaponResultContent = ({isLoading, results}: WeaponResultContentProps) => {
    if (isLoading) {
        return <WeaponResultSkeleton/>
    }
    if (results.length === 0) {
        return (
            <p className={'text-muted-foreground text-sm'}>
                All weapon types are already covered by legendaries.
            </p>
        )
    }
    return (
        <div className={'flex flex-col bg-accent rounded-md overflow-hidden'}>
            {results.map(([type, charSet]) => (
                <WeaponResultRow key={type} weaponType={type} characterCount={charSet.size}/>
            ))}
        </div>
    )
}

const WeaponResultSkeleton = () => (
    <div className={'flex flex-col gap-2 p-3 bg-accent rounded-md'}>
        {Array.from({length: SKELETON_ROWS}).map((_, i) => (
            <div key={i} className={'flex gap-3 items-center'}>
                <Skeleton className={'h-9 w-9 rounded'}/>
                <Skeleton className={'h-4 flex-1'}/>
                <Skeleton className={'h-4 w-10'}/>
            </div>
        ))}
    </div>
)

type WeaponResultRowProps = {
    weaponType: WeaponType
    characterCount: number
}

const WeaponResultRow = ({weaponType, characterCount}: WeaponResultRowProps) => (
    <div className={'flex gap-3 items-center px-3 py-2 border-b last:border-b-0 border-background'}>
        <img
            src={getWeaponTypeIconUrl(weaponType)}
            alt={weaponType}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className={'shrink-0'}
        />
        <span className={'flex-1 font-medium'}>{weaponType}</span>
        <span className={'text-sm text-muted-foreground tabular-nums'}>
            {characterCount} {characterCount === 1 ? 'character' : 'characters'}
        </span>
    </div>
)

// --- Pure logic helpers ---

const resolveCharacterEquipments = (queries: ReturnType<typeof useEquipmentTabs>): CharacterEquipments[] =>
    queries.reduce<CharacterEquipments[]>((acc, query) => {
        if (query.data) acc.push(query.data)
        return acc
    }, [])

const buildWeaponCharacterMap = (
    characterEquipments: CharacterEquipments[],
    itemById: Map<number, Item>,
    accountLegendaryTypes: Set<WeaponType>,
): WeaponResult[] => {
    const map = new Map<WeaponType, Set<string>>()

    characterEquipments.forEach(({character, equipmentTabs}) => {
        const weaponTypesForChar = new Set<WeaponType>()

        equipmentTabs.forEach(tab => {
            tab.equipment
                .filter(e => equipmentWeaponSlots.includes(e.slot))
                .forEach(e => {
                    const item = itemById.get(e.id)
                    if (!item || !isWeapon(item)) return
                    if (item.rarity === ItemRarity.LEGENDARY) return
                    if (accountLegendaryTypes.has(item.details.type)) return
                    weaponTypesForChar.add(item.details.type)
                })
        })

        weaponTypesForChar.forEach(weaponType => {
            const existing = map.get(weaponType)
            if (existing) {
                existing.add(character.name)
            } else {
                map.set(weaponType, new Set([character.name]))
            }
        })
    })

    return [...map.entries()].sort((a, b) => b[1].size - a[1].size)
}
