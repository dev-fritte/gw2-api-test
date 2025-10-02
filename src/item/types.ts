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

export enum WeaponType {
    AXE = 'Axe',
    DAGGER = 'Dagger',
    MACE = 'Mace',
    PISTOL = 'Pistol',
    SCEPTER = 'Scepter',
    SWORD = 'Sword',
    FOCUS = 'Focus',
    SHIELD = 'Shield',
    TORCH = 'Torch',
    WARHORN = 'Warhorn',
    GREATSWORD = 'Greatsword',
    HAMMER = 'Hammer',
    LONGBOW = 'LongBow',
    RIFLE = 'Rifle',
    SHORTBOW = 'ShortBow',
    STAFF = 'Staff',
    HARPOON = 'Harpoon',
    SPEARGUN = 'Speargun',
    TRIDENT = 'Trident',
    LARGE_BUNDLE = 'LargeBundle',
    SMALL_BUNDLE = 'SmallBundle',
    TOY = 'Toy',
    TOY_TWO_HANDED = 'ToyTwoHanded',
}

export enum ItemRarity {
    JUNK = 'Junk',
    BASIC = 'Basic',
    FINE = 'Fine',
    MASTERWORK = 'Masterwork',
    RARE = 'Rare',
    EXOTIC = 'Exotic',
    ASCENDED = 'Assended',
    LEGENDARY = 'Legendary',
}

export enum DamageType {
    FIRE = 'Fire',
    ICE = 'Ice',
    LIGHTNING = 'Lightning',
    PHYSICAL = 'Physical',
    CHOKING = 'Choking',
}

export type LegendaryItemWithCount = {
    item: Item,
    count: number,
}