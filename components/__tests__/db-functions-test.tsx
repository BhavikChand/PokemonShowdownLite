// db-functions.test.ts
import * as SQLite from 'expo-sqlite';
import * as func from '@/components/db-functions/db-functions';
import { TeamBuilderPokemon } from '../db-functions/db-types';

jest.mock('expo-sqlite', () => ({
    openDatabaseAsync: jest.fn().mockReturnValue({
        execAsync: jest.fn(),
        runAsync: jest.fn(),
        getAllAsync: jest.fn(),
    }),
    openDatabaseSync: jest.fn().mockReturnValue({
        runAsync: jest.fn(),
        getAllAsync: jest.fn()
    }),
}));
global.fetch = jest.fn();
describe('Database Functions', () => {
    let db;

    beforeEach(() => {
        db = SQLite.openDatabaseAsync('Showdown');
    });

    it('should create tables on startDBAndTables', async () => {
        await func.startDBAndTables();

        expect(db.execAsync).toHaveBeenCalled();
        expect(db.execAsync).toHaveBeenCalledWith(expect.any(String));
    });

    it('should reset the database and recreate tables', async () => {
        await func.resetDatabase();

        expect(db.execAsync).toHaveBeenCalled();
        expect(db.execAsync).toHaveBeenCalledWith(expect.stringContaining('DROP TABLE IF EXISTS'));
    });

    it('should create a new user', async () => {
        const username = 'testUser';
        const password = 'testPassword';

        await func.createUser(username, password);

        expect(db.runAsync).toHaveBeenCalledWith('INSERT INTO user (username, password) VALUES (?, ?)', username, password);
    });

    it('should get user by username and password', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        db.getAllAsync.mockResolvedValueOnce([{ user_id: 1, username, password }]); // Mock response

        const user = await func.getUser(username, password);

        expect(user).toEqual({ user_id: 1, username, password });
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM user WHERE username=? AND password=?', [username, password]);
    });

    it('should return null', async () => {
        const username = 'testUser';
        const password = 'testPassword';
        db.getAllAsync.mockResolvedValueOnce([]); // no results

        const user = await func.getUser(username, password);

        expect(user).toEqual(null);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM user WHERE username=? AND password=?', [username, password]);
    });

    it('should insert a pokemon into the database', async () => {
        const mockPokemon: TeamBuilderPokemon = {
            pokemon_id: 1,
            team_id: 1,
            pokemon_name: 'Pikachu',
            pokemon_sprite: 'pikachu.png',
            primary_type: 'Normal',
            secondary_type: 'None',
            hp: 35,
            attack: 55,
            special_attack: 40,
            defense: 40,
            special_defense: 50,
            speed: 90,
            move_1: 1,
            move_2: 2,
            move_3: 3,
            move_4: 4,
        };

        const runAsyncMock = jest.fn();
        db.runAsync.mockImplementation(runAsyncMock);

        await func.insertPokemon(1, 1, mockPokemon);

        expect(runAsyncMock).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO pokemon'),
            1,
            1,
            mockPokemon.pokemon_id,
            mockPokemon.move_1,
            mockPokemon.move_2,
            mockPokemon.move_3,
            mockPokemon.move_4,
            mockPokemon.primary_type,
            mockPokemon.secondary_type
        );
    });

    it('should get pokemon by name', async () => {
        const mockName = 'Pikachu';
        const mockRows = [{ pokemon_name: 'Pikachu', pokemon_id: 1 }];

        // Mocking the getAllAsync method to return an array
        let db2 = SQLite.openDatabaseSync('Showdown');
        db2.getAllAsync.mockResolvedValue(mockRows);

        const result = await func.getPokemonByName(mockName);

        expect(result).toEqual(mockRows);
        expect(db2.getAllAsync).toHaveBeenCalledWith(
            'SELECT * FROM pokemon_stats WHERE pokemon_name LIKE ?',
            [`%${mockName}%`]
        );
    });

    it('should return null if no Pokémon found', async () => {
        const mockName = 'Unknown';

        // Mocking the getAllAsync method to return an empty array
        let db2 = SQLite.openDatabaseSync('Showdown');
        db2.getAllAsync.mockResolvedValue([]);

        const result = await func.getPokemonByName(mockName);

        expect(result).toBeNull();
        expect(db2.getAllAsync).toHaveBeenCalledWith(
            'SELECT * FROM pokemon_stats WHERE pokemon_name LIKE ?',
            [`%${mockName}%`]
        );
    });

    it('should return user teams when found', async () => {
        const mockUserId = 1;
        const mockTeams = [{ team_id: 1, team_name: 'Team A' }, { team_id: 2, team_name: 'Team B' }];

        db.getAllAsync.mockResolvedValue(mockTeams);

        const result = await func.getUserTeam(mockUserId);

        expect(result).toEqual(mockTeams);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM teams WHERE user_id=?', mockUserId);
    });

    describe('createNewTeamDB', () => {
        it('should create a new team successfully', async () => {
            const mockUserId = 1;
            const mockTeamName = 'Team C';
            const mockReturnVal = { success: true };

            let db2 = SQLite.openDatabaseSync('Showdown');
            db2.runAsync.mockResolvedValue(mockReturnVal);

            const result = await func.createNewTeamDB(mockTeamName, mockUserId);

            expect(result).toEqual(mockReturnVal);
            expect(db2.runAsync).toHaveBeenCalledWith('INSERT INTO teams (user_id, team_name) VALUES (?, ?)', mockUserId, mockTeamName);
        });
    });

    it('should return the correct team when found', async () => {
        const mockTeam = { team_id: 1, user_id: 1, team_name: 'name' };

        // Mocking the getAllAsync method to return the mock team
        let db2 = SQLite.openDatabaseSync('Showdown');
        db2.getAllAsync.mockResolvedValue([mockTeam]);

        const result = await func.getTeamWithName(1, 'name');

        expect(result).toEqual(mockTeam);
        expect(db2.getAllAsync).toHaveBeenCalledWith(
            'SELECT * FROM teams WHERE user_id=? and team_name=?',
            mockTeam.user_id,
            'name'
        );
    });

    it('should get all users', async () => {
        const mockUsers = [
            { user_id: 1, username: 'user1', password: 'pass1' },
            { user_id: 2, username: 'user2', password: 'pass2' },
        ];

        db.getAllAsync.mockResolvedValue(mockUsers);

        const result = await func.debugGetAllUser();

        expect(result).toEqual(mockUsers);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM user');
    });

    it('should get all teams', async () => {
        const mockTeams = [
            { team_id: 1, user_id: 1, name: 'Team A' },
            { team_id: 2, user_id: 2, name: 'Team B' },
        ];

        db.getAllAsync.mockResolvedValue(mockTeams);

        const result = await func.debugGetAllTeams();

        expect(result).toEqual(mockTeams);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM teams');
    });

    it('should get all Pokémon', async () => {
        const mockPokemon = [
            { user_id: 1, team_id: 1, pokemon_id: 1, move_1: 1, move_2: 2, move_3: 3, move_4: 4, primary_type: 'Electric', secondary_type: 'None' },
            { user_id: 1, team_id: 1, pokemon_id: 2, move_1: 5, move_2: 6, move_3: 7, move_4: 8, primary_type: 'Water', secondary_type: 'None' },
        ];

        db.getAllAsync.mockResolvedValue(mockPokemon);

        const result = await func.debugGetAllDbPokemon();

        expect(result).toEqual(mockPokemon);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM pokemon');
    });

    it('should get all moves', async () => {
        const mockMoves = [
            { move_id: 1, move_name: 'Thunderbolt', attack_num: 90, accuracy: 100, is_special: 1, pp: 15, status: 0, type: 'Electric' },
            { move_id: 2, move_name: 'Water Gun', attack_num: 40, accuracy: 100, is_special: 1, pp: 25, status: 0, type: 'Water' },
        ];

        db.getAllAsync.mockResolvedValue(mockMoves);

        const result = await func.debugGetAllMoves();

        expect(result).toEqual(mockMoves);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM moves');
    });

    it('should get all Pokémon stats', async () => {
        const mockPokemonStats = [
            { pokemon_id: 1, pokemon_name: 'Pikachu', pokemon_sprite: 'pikachu.png', hp: 35, attack: 55, special_attack: 40, defense: 40, special_defense: 50, speed: 90 },
            { pokemon_id: 2, pokemon_name: 'Bulbasaur', pokemon_sprite: 'bulbasaur.png', hp: 45, attack: 49, special_attack: 65, defense: 49, special_defense: 65, speed: 45 },
        ];

        db.getAllAsync.mockResolvedValue(mockPokemonStats);

        const result = await func.debugGetAllDbPokemonStats();

        expect(result).toEqual(mockPokemonStats);
        expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM pokemon_stats');
    });

    it('should load sprites for Pokémon IDs 1 to 151', async () => {
        await func.loadSprites();


        expect(db.execAsync).toHaveBeenCalledTimes(154); // Check that execAsync was called 154 times (opening the db is 3 calls)
    });

    it('should handle errors gracefully', async () => {
        db.execAsync.mockRejectedValueOnce(new Error('Database error'));

        console.error = jest.fn(); // Mock console.error

        await func.loadSprites();

        // Check that an error was logged for Pokémon ID 1
        expect(console.error).toHaveBeenCalledWith(
            'Failed to load sprites for Pokémon ID 1:',
            expect.any(Error)
        );
    });

    it('should fetch and store Gen 1 moves', async () => {
        // Mock the fetch response for the generation
        const gen1Response = {
            moves: [
                { url: 'https://pokeapi.co/api/v2/move/1/' },
                { url: 'https://pokeapi.co/api/v2/move/2/' },
            ],
        };
        const move1Details = {
            id: 1,
            name: 'Pound',
            power: 40,
            accuracy: 100,
            damage_class: { name: 'normal' },
            pp: 35,
            type: { name: 'normal' },
        };
        const move2Details = {
            id: 2,
            name: 'Karate Chop',
            power: 50,
            accuracy: 100,
            damage_class: { name: 'fighting' },
            pp: 25,
            type: { name: 'fighting' },
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(gen1Response),
        });
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(move1Details),
        });
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(move2Details),
        });
        await func.getGen1MovesAndStore();

        expect(db.runAsync).toHaveBeenCalledTimes(4);
        expect(db.runAsync).toHaveBeenCalledWith(
            'INSERT INTO moves (move_id, move_name, attack_num, accuracy, is_special, pp, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            1, 'Pound', 40, 100, false, 35, 'normal'
        );
        expect(db.runAsync).toHaveBeenCalledWith(
            'INSERT INTO moves (move_id, move_name, attack_num, accuracy, is_special, pp, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
            2, 'Karate Chop', 50, 100, false, 25, 'fighting'
        );
        expect(fetch).toHaveBeenCalledTimes(3);
    }, 10000);

    it('fetches Gen 1 Pokémon and stores them in the database', async () => {
        // Mock the fetch response for the generation
        const gen1Response = {
            pokemon_species: [
                { name: 'bulbasaur' },
                { name: 'ivysaur' },
            ],
        };

        const bulbasaurDetails = {
            id: 1,
            name: 'bulbasaur',
            stats: [
                { stat: { name: 'hp' }, base_stat: 45 },
                { stat: { name: 'attack' }, base_stat: 49 },
                { stat: { name: 'special-attack' }, base_stat: 65 },
                { stat: { name: 'defense' }, base_stat: 49 },
                { stat: { name: 'special-defense' }, base_stat: 65 },
                { stat: { name: 'speed' }, base_stat: 45 },
            ],
        };

        const ivysaurDetails = {
            id: 2,
            name: 'ivysaur',
            stats: [
                { stat: { name: 'hp' }, base_stat: 60 },
                { stat: { name: 'attack' }, base_stat: 62 },
                { stat: { name: 'special-attack' }, base_stat: 80 },
                { stat: { name: 'defense' }, base_stat: 63 },
                { stat: { name: 'special-defense' }, base_stat: 80 },
                { stat: { name: 'speed' }, base_stat: 60 },
            ],
        };

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(gen1Response),
        });
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(bulbasaurDetails),
        });
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(ivysaurDetails),
        });



        await func.getAllGen1PokemonAndStore();


        expect(db.runAsync).toHaveBeenCalledTimes(6);
        expect(db.runAsync).toHaveBeenCalledWith(
            'INSERT INTO pokemon_stats (pokemon_id, pokemon_name, hp, attack, special_attack, defense, special_defense, speed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            1, 'bulbasaur', 45, 49, 65, 49, 65, 45
        );
        expect(db.runAsync).toHaveBeenCalledWith(
            'INSERT INTO pokemon_stats (pokemon_id, pokemon_name, hp, attack, special_attack, defense, special_defense, speed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            2, 'ivysaur', 60, 62, 80, 63, 80, 60
        );

        // Check that fetch was called correctly
        expect(fetch).toHaveBeenCalledTimes(6);
    });
});
