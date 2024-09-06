import * as SQLite from 'expo-sqlite'

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
        `);
}


// function will get an array of every user:
// user_id: number, username: string, password: string;
export async function debugViewAllUser(){
    let db = await SQLite.openDatabaseAsync('Showdown');
    const allRows = await db.getAllAsync('SELECT * FROM user');
    return allRows;
}