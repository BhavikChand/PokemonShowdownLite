import * as SQLite from 'expo-sqlite'

export async function generateFakeUsersDB() {
    let db = await SQLite.openDatabaseAsync('Showdown');

    const result = await db.runAsync('INSERT INTO user (username, password) VALUES (?, ?)', 'daspeedsta', 'qweerteee');

}

