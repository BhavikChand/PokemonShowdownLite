import Pokemon from './pokemon';
import battleData from './../app/(tabs)/battle/battle'
// const readlineSync = require('readline-sync');

// 1. Try first: ts-node battle.ts (Run this command inside /scripts directory)
// 2. Used npm readlineSync to read the ts terminal input (npm install readline-sync => if you don't already have it.)
// 3. (If don't have ts-node and typescript => npm install -g typescript ts-node)
// 4. to battle do: ts-node battle.ts (Run this command inside /scripts directory)

//pkmnMove has the move, move damage, etc.
export function battle(currPlayerPkmn, currOpponentPkmn, pkmnMove): void {

  // let pkmnData = battleData.BattleScreen();
  console.log(pkmnData);
  console.log(pkmnMove);

  //Death Array;
  let currPlayerFaint = [false,false,false,false,false,false];
  let currOpponentFaint = [false,false,false,false,false,false];

  //Take currPlayerPkmn (Current pokemon that used a move, my trainer);
  //Take currOpponentPkmn 
  // Check speed values, account for speed tie.

  //TODO Make speedCheck in util.
  // speedCheck()

  


    
}

// battle();

//=-=-=-=-=-=-=-=-=-=-=-=: Old mock code Below :=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// const player1PokemonName: string = readlineSync.question('Enter the name of your Pokemon (Player 1): ');
    // const player1Health: number = parseInt(readlineSync.question('Enter the health of your Pokemon: '), 10);

    // const player1Moves: string[] = [];
    // const player1AttackDamage: number[] = [];
    // const player1PP: number[] = [];

    // for (let i = 0; i < 4; i++) {
    //     player1Moves.push(readlineSync.question(`Enter the name of move ${i + 1} for your Pokemon: `));
    //     player1AttackDamage.push(parseInt(readlineSync.question(`Enter the attack power of move ${i + 1}: `), 10));
    //     player1PP.push(parseInt(readlineSync.question(`Enter the PP of move ${i + 1}: `), 10));
    // }

    // const player1Pokemon = new Pokemon(player1PokemonName, player1Health, player1Moves, player1AttackDamage, player1PP);

    // const opponentType: number = parseInt(readlineSync.question('Do you want to play against a player (2) or an AI opponent? Enter 1 for player, 2 for AI: '), 10);

    // let opponentPokemon: Pokemon;

    // if (opponentType === 1) {
    //     const opponentPokemonName: string = readlineSync.question("Enter the name of the opponent's Pokemon (Player 2): ");
    //     const opponentHealth: number = parseInt(readlineSync.question("Enter the health of the opponent's Pokemon: "), 10);

    //     const opponentMoves: string[] = [];
    //     const opponentAttackDamage: number[] = [];
    //     const opponentPP: number[] = [];

    //     for (let i = 0; i < 4; i++) {
    //         opponentMoves.push(readlineSync.question(`Enter the name of move ${i + 1} for the opponent's Pokemon: `));
    //         opponentAttackDamage.push(parseInt(readlineSync.question(`Enter the attack power of move ${i + 1}: `), 10));
    //         opponentPP.push(parseInt(readlineSync.question(`Enter the PP of move ${i + 1}: `), 10));
    //     }

    //     opponentPokemon = new Pokemon(opponentPokemonName, opponentHealth, opponentMoves, opponentAttackDamage, opponentPP);

    // } else {
    //     const opponentPokemonName: string = "AI Opponent";
    //     const opponentHealth: number = parseInt(readlineSync.question("Enter the health of the AI opponent's Pokemon: "), 10);

    //     const aiMoves: string[] = ["Tackle", "Quick Attack", "Bite", "Scratch"];
    //     const aiAttackDamage: number[] = [10, 15, 20, 12];
    //     const aiPP: number[] = [35, 30, 25, 40];

    //     opponentPokemon = new Pokemon(opponentPokemonName, opponentHealth, aiMoves, aiAttackDamage, aiPP);
    // }

    // console.log("\nPlayer 1's Pokemon:");
    // player1Pokemon.displayStats();
    // console.log("\nOpponent's Pokemon:");
    // opponentPokemon.displayStats();

    // //Battle loop
    // while (player1Pokemon.getHealth() > 0 && opponentPokemon.getHealth() > 0) {
    //     console.log("\nPlayer 1's turn:");
    //     let validMoveSelected = false;

    //     while (!validMoveSelected) {
    //         player1Pokemon.displayMoves();
    //         const moveChoice: number = parseInt(readlineSync.question('Choose a move (1-4): '), 10) - 1;

    //         if (player1Pokemon.getPP(moveChoice) > 0) {
    //             player1Pokemon.attack(opponentPokemon, moveChoice);
    //             validMoveSelected = true;
    //         } else {
    //             console.log('No PP left for that move! Please choose another move.');
    //         }
    //     }

    //     //Check if opponent alive
    //     if (opponentPokemon.getHealth() <= 0) {
    //         console.log(`${opponentPokemon.getName()} has fainted! Player 1 wins!`);
    //         break;
    //     }

    //     console.log("\nOpponent's turn:");
    //     if (opponentType === 1) {
    //         validMoveSelected = false;
    //         while (!validMoveSelected) {
    //             opponentPokemon.displayMoves();
    //             const opponentMoveChoice: number = parseInt(readlineSync.question('Player 2, choose a move (1-4): '), 10) - 1;

    //             if (opponentPokemon.getPP(opponentMoveChoice) > 0) {
    //                 opponentPokemon.attack(player1Pokemon, opponentMoveChoice);
    //                 validMoveSelected = true;
    //             } else {
    //                 console.log('No PP left for that move! Please choose another move.');
    //             }
    //         }
    //     } else {
    //         //"AI"
    //         let aiMoveChoice: number;
    //         do {
    //             aiMoveChoice = Math.floor(Math.random() * 4);
    //         } while (opponentPokemon.getPP(aiMoveChoice) <= 0);

    //         opponentPokemon.attack(player1Pokemon, aiMoveChoice);
    //     }

    //     if (player1Pokemon.getHealth() <= 0) {
    //         console.log(`${player1Pokemon.getName()} has fainted! ${opponentPokemon.getName()} wins!`);
    //         break;
    //     }
    // }