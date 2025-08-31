export type Character = {
    name: string,
    race: 'Human' | 'Charr' | 'Norn' | 'Asura',
    gender: 'Female' | 'Male',
    profession: ProfessionEnum,
    level: number,
    guild: string,
    created: string,
    age: number, // in seconds.
    deaths: number,
    title: number, // references /v2/titles
    crafting: unknown[],
    backstory: number[]
}

export enum ProfessionEnum {
    MESMER = 'Mesmer',
    NECROMANCER = 'Necromancer',
    ENGINEER = 'Engineer',
    THIEF = 'Thief',
    WARRIOR = 'Warrior',
    ELEMENTALIST = 'Elementalist',
    RANGER = 'Ranger',
    GUARDIAN = 'Guardian',
    REVENANT = 'Revenant',
}