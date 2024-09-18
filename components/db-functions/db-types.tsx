export type User = {
    user_id: number,
    username: string,
    password: string
}

export type Team = {
    team_id: number,
    user_id: number,
    name: string
}

export type DbPokemon = {
    user_id: number,
    team_id: number,
    pokemon_id: number,
    move_1: number,
    move_2: number,
    move_3: number,
    move_4: number,
    primary_type: string,
    secondary_type: string
}

export type AttackMove = {
    move_id: number,
    move_name: string,
    attack_num: number,
    accuracy: number,
    // is_special is supposed to be a bool, no bools in sqlite
    is_special: number,
    pp: number,
    status: number,
    type: string,
}

export type DbPokemonStats = {
    pokemon_id: number,
    pokemon_name: string,
    pokemon_sprite: string,
    hp: number,
    attack: number,
    special_attack: number,
    defense: number,
    special_defense: number,
    speed: number
}