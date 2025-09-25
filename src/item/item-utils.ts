import {type Item, ItemRarity} from '@/item/types.ts'
import colors from '@/utils/colors'
import type {ItemTypeFilterValue} from '@/item/components/ItemTypeSelect.tsx'

export const getItemRarityColor = (rarity: ItemRarity) => {
    switch (rarity as ItemRarity) {
        case ItemRarity.LEGENDARY:
            return colors.items.rarity.legendary
    }
}

export const filterByItemType = (items: Item[] | undefined, filter: ItemTypeFilterValue | null) => {
    if (!items || filter === 'All' || filter === null) {
        return items
    }

    return items?.filter(l => {
        return l.type?.toLowerCase() === filter?.toLowerCase()
    })
}