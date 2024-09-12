import * as SQLite from 'expo-sqlite'
import { User, Team, DbPokemon, AttackMove, DbPokemonStats } from './db-types';
import * as FileSystem from 'expo-file-system';
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
            is_special INTEGER,
            pp INTEGER,
            status INTEGER, 
            type INTEGER
        );
        CREATE TABLE IF NOT EXISTS pokemon_stats (
            pokemon_id INTEGER,
            pokemon_name TEXT,
            pokemon_sprite TEXT,
            hp INTEGER,
            attack INTEGER,
            special_attack INTEGER, 
            defense INTEGER,
            special_defense INTEGER,
            speed INTEGER
        );
        
        CREATE TABLE IF NOT EXISTS sprite_table (
        pokemon_id INTEGER,
        front_sprite TEXT,
        back_sprite TEXT
        );

        `);
        // TODO: Prepopulate the moves data base with all moves,
        // or conisder only adding moves to that db when a pokemon
        // is added into a team.
}

/**resets the database.*/
export async function resetDatabase() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    // Drop existing tables
    await db.execAsync(`
    DROP TABLE IF EXISTS user;
    DROP TABLE IF EXISTS teams;
    DROP TABLE IF EXISTS pokemon;
    DROP TABLE IF EXISTS moves;
    DROP TABLE IF EXISTS pokemon_stats;
  `);

    // Recreate tables
    await startDBAndTables();

    console.log("Database reset successful");
}


/**
 * Write any sql functions you need around here, we can sort it after we have them all.
 * When dealing with user inputted sql statements, like username and team name, use db.transaciton (it prevents sql attacks)
 * Otherwise .getAllAsync is fine 
 */


export async function getUserTeam(userId: number) {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM teams WHERE user_id=?', userId);
    return allRows;
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
// created function to load the sprites
export async function loadSprites() {
    let db = await SQLite.openDatabaseAsync('Showdown');
    const frontSpritesDir = FileSystem.documentDirectory + 'front_sprites/';
    const backSpritesDir = FileSystem.documentDirectory + 'back_sprites/'; //checks the apps files

    // This loops through the whole pokedex starting from 1
    for (let pokemonId = 1; pokemonId <= 151; pokemonId++) {
        try {
            // makes the file using the id (the png files start with the id number of the pokemon)
            const frontSprite = `${pokemonId}_front.png`; 
            const backSprite = `${pokemonId}_back.png`;   

            // Checks for file needs fixing 
            const frontSpriteCheck = await FileSystem.getInfoAsync(frontSpritesDir + frontSprite);
            const backSpriteCheck = await FileSystem.getInfoAsync(backSpritesDir + backSprite);

            console.log(`Looking for front sprite at: ${frontSpritesDir + frontSprite}`);
            console.log(`Looking for back sprite at: ${backSpritesDir + backSprite}`);
            
            if (frontSpriteCheck.exists && backSpriteCheck.exists) {
                const insertFrontSprite = `INSERT OR REPLACE INTO sprite_table (pokemon_id, front_sprite) 
                                           VALUES (${pokemonId}, '${frontSprite}')`;

                const insertBackSprite = `INSERT OR REPLACE INTO sprite_table (pokemon_id, back_sprite) 
                                          VALUES (${pokemonId}, '${backSprite}')`;

                await db.execAsync(insertFrontSprite);
                await db.execAsync(insertBackSprite);

                console.log(`Loaded sprites for Pokémon ID ${pokemonId}`);
            } 
            else 
            {
                console.warn(`Sprites not found for Pokémon ID ${pokemonId}`);
            }
        } catch (error) {
            console.error(`Failed to load sprites for Pokémon ID ${pokemonId}:`, error);
        }
    }
}