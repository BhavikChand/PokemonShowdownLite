import * as SQLite from 'expo-sqlite'
import { User, Team, DbPokemon, AttackMove, DbPokemonStats } from './db-types';

/** 
 * Used when launching the app. Starts the data base.
 */
export async function startDBAndTables(){
    let db = await SQLite.openDatabaseAsync('Showdown');
    
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT NOT NULL,
            password TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS teams (
            team_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            team_name TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS pokemon (
            user_id INTEGER NOT NULL,
            team_id INTEGER NOT NULL,
            pokemon_id INTEGER NOT NULL,
            move_1 INTEGER,
            move_2 INTEGER,
            move_3 INTEGER,
            move_4 INTEGER
        );
        CREATE TABLE IF NOT EXISTS moves (
            move_id INTEGER NOT NULL,
            move_name TEXT,
            attack_num INTEGER,
            accuracy INTEGER,
            is_special BOOLEAN,
            pp INTEGER,
            type INTEGER
        );
        CREATE TABLE IF NOT EXISTS pokemon_stats (
            pokemon_id INTEGER,
            pokemon_name TEXT,
            hp INTEGER,
            attack INTEGER,
            special_attack INTEGER, 
            defense INTEGER,
            special_defense INTEGER,
            speed INTEGER
        );
        `);
}

/**resets the database.*/
export async function resetDatabase() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    // Drop existing tables
    await db.execAsync(`
    DROP TABLE IF EXISTS user;
    DROP TABLE IF EXISTS teams;
    DROP TABLE IF EXISTS pokemon;
  `);

    // Recreate tables
    await startDBAndTables();

    console.log("Database reset successful");
}

/**
 * Write any sql functions you need around here, we can sort it after we have them all.
 * When creating INSERT statements use .runAsync
 */


export async function getUserTeam(userId: number) {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM teams WHERE user_id=?', userId);
    return allRows;
}

export async function createUser(username: string, password:string) {
    let db = await SQLite.openDatabaseAsync('Showdown');

    let returnVal = await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', username, password);
    return returnVal;
}

export async function getUser(username:string, password:string) {
    let db = await SQLite.openDatabaseAsync('Showdown');

    const allRows = await db.getAllAsync('SELECT * FROM user WHERE username=? AND password=?', [username, password]);
    if (allRows.length > 0) {
        return allRows[0] as User;
    } else {
        return null; 
    }
}

//DEBUG FUNCTIONS: These should just be used to ensure that the tables are getting data correctly
//TODO: Remove these functions in a future PR once more proper functions are implemented.

export async function debugGetAllUser(){
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM user') as User[];
    return allRows;
}
export async function debugGetAllTeams() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM teams') as Team[];
    return allRows;
}
export async function debugGetAllDbPokemon() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM pokemon') as DbPokemon[];
    return allRows;
}
export async function debugGetAllMoves() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM moves') as AttackMove[];
    return allRows;
}
export async function debugGetAllDbPokemonStats() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM pokemon_stats') as DbPokemonStats[];
    return allRows;
}

// API Functions downbelow
// Most of the API util will be used through the database as to mimize API calls

export async function getAllGen1PokemonAndStore() {
    try {
        // Fetch all Gen 1 Pokémon from PokeAPI
        const response = await fetch('https://pokeapi.co/api/v2/generation/1/');
        const data = await response.json();
        const gen1Pokemon = data.pokemon_species;
        let count = 0;

        for (const pokemon of gen1Pokemon) {
            count += 1;
            const pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const pokemonData = await pokemonDetails.json();

            const pokemonId = pokemonData.id;
            const pokemonName = pokemonData.name;
            const hp = pokemonData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat;
            const attack = pokemonData.stats.find((stat: any) => stat.stat.name === 'attack').base_stat;
            const specialAttack = pokemonData.stats.find((stat: any) => stat.stat.name === 'special-attack').base_stat;
            const defense = pokemonData.stats.find((stat: any) => stat.stat.name === 'defense').base_stat;
            const specialDefense = pokemonData.stats.find((stat: any) => stat.stat.name === 'special-defense').base_stat;
            const speed = pokemonData.stats.find((stat: any) => stat.stat.name === 'speed').base_stat;
            let db = await SQLite.openDatabaseAsync('Showdown');

            let returnVal = await db.runAsync('INSERT INTO pokemon_stats (pokemon_id, pokemon_name, hp, attack, special_attack, defense, special_defense, speed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                 pokemonId, pokemonName, hp, attack, specialAttack, defense, specialDefense, speed);  
        }
        console.log("Success getting all of pokemon");
        console.log("Total amount of grabbed by poke api was", count);

    } catch (error) {
        console.error('Error fetching Gen 1 pokemon:', error);
    }
}

export async function getGen1MovesAndStore() {
    try {
        // Fetch Gen 1 Pokémon generation data
        const response = await fetch('https://pokeapi.co/api/v2/generation/1/');
        const data = await response.json();
        const moves = data.moves;
        
        for (const move of moves) {
            const moveDetailsResponse = await fetch(move.url);
            const moveDetails = await moveDetailsResponse.json();

            const moveId = moveDetails.id;
            const moveName = moveDetails.name;
            const attackNum = moveDetails.power || 0;
            const accuracy = moveDetails.accuracy || 0; 
            const isSpecial = moveDetails.damage_class.name === 'special';
            const pp = moveDetails.pp;
            const type = moveDetails.type.name;

            // Store in the database
            let db = await SQLite.openDatabaseAsync('Showdown');
            await db.runAsync('INSERT INTO moves (move_id, move_name, attack_num, accuracy, is_special, pp, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
                moveId, moveName, attackNum, accuracy, isSpecial, pp, type);
        }

        console.log("Success fetching and storing Gen 1 moves");
    } catch (error) {
        console.error('Error fetching Gen 1 moves:', error);
    }
}
