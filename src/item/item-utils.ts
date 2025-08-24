import {ItemRarity} from '@/item/types.ts'
import colors from '@/utils/colors';

export const getItemRarityColor = (rarity: ItemRarity) => {
    switch (rarity as ItemRarity) {
        case ItemRarity.LEGENDARY: return colors.items.rarity.legendary;
    }
}