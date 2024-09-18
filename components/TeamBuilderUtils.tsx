import { debugGetAllMoves } from "./db-functions/db-functions";
import { AttackMove } from "./db-functions/db-types";

export interface getAllLearnedMovesStatus {
    moreThan4Moves: boolean | null;
    moves: AttackMove[] | null;
    pingedApi: boolean;
}

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