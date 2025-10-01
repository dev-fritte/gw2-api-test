import type {Character} from '@/character/character-types.ts'

export type EquipmentTab = {
    tab: number,
    name: string,
    is_active: boolean,
    equipment: Equipment[],
    equipment_pvp: PvpEquipment,
}

export type PvpEquipment = {
    amulet: number,
    rune: number,
    sigils: number [],
}

export type Equipment = {
    id: number,
    slot: EquipmentSlot,
    skin?: number,
    upgrades?: number[]
    infusions?: number[],
    binding?: Binding,
    bound_to?: string,
    location: EquipmentLocation,
    dyes?: number[],
    //stats
    //equipment_pvp
}

export type CharacterEquipments = {
    character: Character,
    equipmentTabs: EquipmentTab[],
}

export enum EquipmentSlot {
    HELM_AQUATIC = 'HelmAquatic',
    COAT = 'Coat',
    BOOTS = 'Boots',
    GLOVERS = 'Gloves',
    HELM = 'Helm',
    LEGGINGS = 'Leggings',
    SHOULDERS = 'Shoulders',
    BACKPACK = 'Backpack',
    ACCESSORY_1 = 'Accessory1',
    ACCESSORY_2 = 'Accessory2',
    RING_1 = 'Ring1',
    RING_2 = 'Ring2',
    AMULET = 'Amulet',
    WEAPON_AQUATIC_A = 'WeaponAquaticA',
    WEAPON_AQUATIC_B = 'WeaponAquaticB',
    WEAPON_A_1 = 'WeaponA1',
    WEAPON_A_2 = 'WeaponA2',
    WEAPON_B_1 = 'WeaponB1',
    WEAPON_B_2 = 'WeaponB2',
}

export enum EquipmentLocation {
    EQUIPPED = 'Equipped',
    ARMORY = 'Armory',
}

enum Binding {
    ACCOUNT = 'Account',
    CHARACTER = 'Character'
}