
export type Item = {
    id: number,
    name: string,
    type: ItemType,
    rarity: ItemRarity,
    icon: string,
    level: number,
    chat_link: string,
}

enum ItemType {
    WEAPON,
    ARMOR,
}

export enum ItemRarity {
    LEGENDARY = 'Legendary',
}