export type Item = {
    id: number,
    name: string,
    type: ItemType,
    rarity: ItemRarity,
    icon: string,
    level: number,
    description: string,
    chat_link: string,
}

export enum ItemType {
    WEAPON = 'weapon',
    ARMOR = 'armor',
}

export enum ItemRarity {
    LEGENDARY = 'Legendary',
}