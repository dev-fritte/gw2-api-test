import {type Item, ItemRarity, ItemType, type Weapon, WeaponType} from '@/item/types.ts'
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

export function isWeapon(item: Item): item is Weapon {
    return item.type === ItemType.WEAPON
}

//TODO: return correct icon for weapon type
export const getWeaponTypeIcon: (weaponType: keyof typeof WeaponType) => string = (weaponType: keyof typeof WeaponType) => {
    return WeaponTypeIcons[weaponType]
}

const WeaponTypeIcons = {
    [WeaponType.AXE]: 'https://wiki.guildwars2.com/images/1/18/Frostfang.png',
    [WeaponType.DAGGER]: 'https://wiki.guildwars2.com/images/5/5b/Incinerator.png',
    [WeaponType.MACE]: 'https://wiki.guildwars2.com/images/3/36/The_Moot.png',
    [WeaponType.PISTOL]: 'https://wiki.guildwars2.com/images/e/e7/Quip.png',
    [WeaponType.SCEPTER]: 'https://wiki.guildwars2.com/images/5/59/Meteorlogicus.png',
    [WeaponType.SWORD]: 'https://wiki.guildwars2.com/images/8/8e/Bolt.png',
    [WeaponType.FOCUS]: 'https://wiki.guildwars2.com/images/7/74/The_Minstrel.png',
    [WeaponType.SHIELD]: 'https://wiki.guildwars2.com/images/e/e7/The_Flameseeker_Prophecies.png',
    [WeaponType.TORCH]: 'https://wiki.guildwars2.com/images/0/0e/Rodgort.png',
    [WeaponType.WARHORN]: 'https://wiki.guildwars2.com/images/e/e4/Howler.png',
    [WeaponType.GREATSWORD]: 'https://wiki.guildwars2.com/images/d/d9/Twilight.png',
    [WeaponType.HAMMER]: 'https://wiki.guildwars2.com/images/b/b6/The_Juggernaut.png',
    [WeaponType.LONGBOW]: 'https://wiki.guildwars2.com/images/1/17/Kudzu.png',
    [WeaponType.RIFLE]: 'https://wiki.guildwars2.com/images/2/2e/The_Predator.png',
    [WeaponType.SHORTBOW]: 'https://wiki.guildwars2.com/images/f/f3/The_Dreamer.png',
    [WeaponType.STAFF]: 'https://wiki.guildwars2.com/images/8/8b/The_Bifrost.png',
    [WeaponType.SPEARGUN]: 'https://wiki.guildwars2.com/images/f/f1/Frenzy.png',
    [WeaponType.HARPOON]: 'https://wiki.guildwars2.com/images/a/a8/Kamohoali%27i_Kotaki.png',
    [WeaponType.TRIDENT]: 'https://wiki.guildwars2.com/images/0/07/Kraitkin.png',
}