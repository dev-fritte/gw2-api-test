export interface Item {
    id: number,
    name: string,
    type: ItemType,
    rarity: ItemRarity,
    icon: string,
    level: number,
    description: string,
    chat_link: string,
}

export interface Weapon extends Item {
    type: ItemType.WEAPON,
    details: {
        type: WeaponType,
        damageType: DamageType,
        min_power: number,
        max_power: number,
        defense: number,
        stat_choices?: number[],
        //TODO: add missing types
    }
}

export enum ItemType {
    WEAPON = 'Weapon',
    ARMOR = 'Armor',
}

export enum ItemRarity {
    LEGENDARY = 'Legendary',
}