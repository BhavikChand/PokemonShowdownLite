import * as SQLite from 'expo-sqlite'

import { getAllGen1PokemonAndStore, getGen1MovesAndStore, loadSprites } from './db-functions';
/**
 * This function generates 3 teams, 2 of which are for user hungryBox
 * 
 */
export async function generateFakeDataDB() {
    let db = await SQLite.openDatabaseAsync('Showdown');

    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'hungryBox', 'qweerteee');
    // Insert 6 entries into the `user` table
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user1', 'password1');
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user2', 'password2');
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user3', 'password3');
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user4', 'password4');
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user5', 'password5');
    await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'user6', 'password6');

    // Insert 6 entries into the `teams` table
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 0, 'FairyPuff');
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 0, 'RockBound');
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 1, 'Team Gamma');
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 4, 'Team Delta');
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 5, 'Team Epsilon');
    await db.runAsync('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', 6, 'Team Zeta');

    // Insert 6 entries into the `pokemon` table
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 1, 10, 20, 30, -1);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 2, 15, 25, 35, 45);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 3, 20, 30, 40, 50);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 4, 25, 35, 45, 55);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 5, 30, 40, 50, 60);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 0, 6, 35, 45, 55, 65);
    // Insert 12 more entries into the `pokemon` table
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 7, 50, 60, 70, 80);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 8, 55, 65, 75, 85);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 9, 60, 70, 80, 90);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 10, 65, 75, 85, 95);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 11, 70, 80, 90, 100);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 1, 1, 12, 75, 85, 95, 105);

    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 13, 80, 90, 100, 110);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 14, 85, 95, 105, 115);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 15, 90, 100, 110, 120);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 16, 95, 105, 115, 125);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 17, 100, 110, 120, 130);
    await db.runAsync('INSERT INTO pokemon (user_id, team_id, pokemon_id, move_1, move_2, move_3, move_4) VALUES (?, ?, ?, ?, ?, ?, ?)', 0, 2, 18, 105, 115, 125, 135);

    //sprite checker
    // tested sprites andy's path
    let frontSpritePath = 'C:/Software Dev/PokemonShowdownLite/assets/images/pokemon_sprites/front_sprites/abra_front.png';
    let backSpritePath = 'C:/Software Dev/PokemonShowdownLite/assets/images/pokemon_sprites/back_sprites/abra_back.png';

    await loadSprites();
    console.log('getting moves');
    await getGen1MovesAndStore();
    console.log('finished, getting all pokemon stats');
    await getAllGen1PokemonAndStore();
    console.log('db finished generating');
}