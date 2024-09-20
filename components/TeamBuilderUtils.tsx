import { createNewTeamDB, debugGetAllMoves, getTeamWithName, insertPokemon } from "./db-functions/db-functions";
import { AttackMove, DbPokemonStats, TeamBuilderPokemon } from "./db-functions/db-types";

export interface getAllLearnedMovesStatus {
    moreThan4Moves: boolean | null;
    moves: AttackMove[] | null;
    pingedApi: boolean;
}

// gets all the moves a pokemon can learn that are from generation 1
export async function getAllLearnedMoves(pokemonID: number): Promise<getAllLearnedMovesStatus> {
    if (typeof (pokemonID) == 'undefined') {
        return { moreThan4Moves: null, moves: null, pingedApi: false };
    }
    try {

        let learnedMoves: string[] = [];
        // Fetch this pokemon's data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
        const data = await response.json();

        const moves = data.moves;

        for (const item of moves) {
            learnedMoves.push(item.move.name);
        }
        console.log("api learned moves", learnedMoves.length);

        // compare with existing db moves:
        let compare = await debugGetAllMoves();
        const filteredMoves = compare.filter(move => learnedMoves.includes(move.move_name));
        console.log("successful filter for gen1 moves, num of moves availible:", filteredMoves.length);

        if (filteredMoves.length < 4) {
            // The mon cant have 4 unique moves.
            return { moreThan4Moves: false, moves: null, pingedApi: true };
        }
        return { moreThan4Moves: true, moves: filteredMoves, pingedApi: true };


    } catch (error) {
        console.error('Error fetching Gen 1 moves:', error);
        return { moreThan4Moves: null, moves: null, pingedApi: false };
    }

}

// Used to give a pokemon its moves to be added into the team array.
export function createNewTeamBuilderPokemon(pokemonStats: DbPokemonStats, move_1: number, move_2: number, move_3: number, move_4: number)
    : TeamBuilderPokemon {
    // Fake attack move(not being added into DB);
    const defaultTeamBuilderPokemon: TeamBuilderPokemon = {
        pokemon_id: pokemonStats.pokemon_id,
        team_id: -1,
        pokemon_name: pokemonStats.pokemon_name,
        pokemon_sprite: "Null.png",
        primary_type: 'Normal',
        secondary_type: 'None',
        hp: pokemonStats.hp,
        attack: pokemonStats.attack,
        special_attack: pokemonStats.special_attack,
        defense: pokemonStats.defense,
        special_defense: pokemonStats.special_defense,
        speed: pokemonStats.speed,
        move_1: move_1,
        move_2: move_2,
        move_3: move_3,
        move_4: move_4,
    };
    return defaultTeamBuilderPokemon;
}

// Removes selected pokemon from array by index
export const removePokemon = (index: number, team: TeamBuilderPokemon[], setTeam: React.Dispatch<React.SetStateAction<TeamBuilderPokemon[]>>) => {
    setTeam(team.filter((_, i) => i !== index));
};

// Creates and returns an array of placeholder mons up to 6
export const fillUpTeam = (team: TeamBuilderPokemon[]): TeamBuilderPokemon[] => {
    const filledTeam = [...team];
    while (filledTeam.length < 6) {
        filledTeam.push({
            pokemon_id: -1,
            team_id: -1,
            pokemon_name: ' - - - - ',
            pokemon_sprite: '',
            primary_type: '',
            secondary_type: '',
            hp: 0,
            attack: 0,
            special_attack: 0,
            defense: 0,
            special_defense: 0,
            speed: 0,
            move_1: 0,
            move_2: 0,
            move_3: 0,
            move_4: 0
        });
    }

    return filledTeam;
}
// We need to make the row in teams before the rows in pokemon, which is why this is here instead of db-funcs
export const addTeamToDatabase = async (team: TeamBuilderPokemon[], teamName: string, userId: number) => {
    console.log('adding team to db');
    // Generate a new Team in the team
    let result = await createNewTeamDB(teamName, userId);
    console.log(result);
    let data = await getTeamWithName(userId, teamName);
    console.log(data.team_name, data.team_id);
    for (const pokemonItem of team) {
        console.log("loopin");
        result = await insertPokemon(userId, data.team_id, pokemonItem);
        console.log(result);
    }
    console.log('all pokemon added');
}
