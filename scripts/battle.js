const readlineSync = require('readline-sync');
const Pokemon = require('./pokemon');

// Used npm readlineSync to read the js terminal input
// to battle do: node battle.js
function battle() {
    
    const player1PokemonName = readlineSync.question('Enter the name of your Pokemon (Player 1): ');
    const player1Health = parseInt(readlineSync.question('Enter the health of your Pokemon: '), 10);

    const player1Moves = [];
    const player1AttackDamage = [];
    const player1PP = [];

    for (let i = 0; i < 4; i++) 
    {
        player1Moves.push(readlineSync.question(`Enter the name of move ${i + 1} for your Pokemon: `));
        player1AttackDamage.push(parseInt(readlineSync.question(`Enter the attack power of move ${i + 1}: `), 10));
        player1PP.push(parseInt(readlineSync.question(`Enter the PP of move ${i + 1}: `), 10));
    }

    const player1Pokemon = new Pokemon(player1PokemonName, player1Health, player1Moves, player1AttackDamage, player1PP);

    const opponentType = parseInt(readlineSync.question('Do you want to play against a player (2) or an AI opponent? Enter 1 for player, 2 for AI: '), 10);

    let opponentPokemon;
    if (opponentType === 1) 
        {
        const opponentPokemonName = readlineSync.question("Enter the name of the opponent's Pokemon (Player 2): ");
        const opponentHealth = parseInt(readlineSync.question("Enter the health of the opponent's Pokemon: "), 10);

        const opponentMoves = [];
        const opponentAttackDamage = [];
        const opponentPP = [];

        for (let i = 0; i < 4; i++) 
        {
            opponentMoves.push(readlineSync.question(`Enter the name of move ${i + 1} for the opponent's Pokemon: `));
            opponentAttackDamage.push(parseInt(readlineSync.question(`Enter the attack power of move ${i + 1}: `), 10));
            opponentPP.push(parseInt(readlineSync.question(`Enter the PP of move ${i + 1}: `), 10));
        }


        opponentPokemon = new Pokemon(opponentPokemonName, opponentHealth, opponentMoves, opponentAttackDamage, opponentPP);

    } 
    else 
    {
        const opponentPokemonName = "AI Opponent";
        const opponentHealth = parseInt(readlineSync.question("Enter the health of the AI opponent's Pokemon: "), 10);

        const aiMoves = ["Tackle", "Quick Attack", "Bite", "Scratch"];
        const aiAttackDamage = [10, 15, 20, 12];
        const aiPP = [35, 30, 25, 40];

        opponentPokemon = new Pokemon(opponentPokemonName, opponentHealth, aiMoves, aiAttackDamage, aiPP);
    }

    console.log("\nPlayer 1's Pokemon:");
    player1Pokemon.displayStats();
    console.log("\nOpponent's Pokemon:");
    opponentPokemon.displayStats();

    //Battle loop
    while (player1Pokemon.getHealth() > 0 && opponentPokemon.getHealth() > 0) 
        {
        console.log("\nPlayer 1's turn:");
        let validMoveSelected = false;

        while (!validMoveSelected) 
        {
            player1Pokemon.displayMoves();
            const moveChoice = parseInt(readlineSync.question('Choose a move (1-4): '), 10) - 1;

            if (player1Pokemon.getPP(moveChoice) > 0) 
            {
                player1Pokemon.attack(opponentPokemon, moveChoice);
                validMoveSelected = true;
            } 
            else 
            {
                console.log('No PP left for that move! Please choose another move.');
            }
        }

        //Check if opponent alive
        if (opponentPokemon.getHealth() <= 0) 
        {
            console.log(`${opponentPokemon.getName()} has fainted! Player 1 wins!`);
            break;
        }

        console.log("\nOpponent's turn:");
        if (opponentType === 1) 
        {
            validMoveSelected = false;
            while (!validMoveSelected) 
            {
                opponentPokemon.displayMoves();
                const opponentMoveChoice = parseInt(readlineSync.question('Player 2, choose a move (1-4): '), 10) - 1;

                if (opponentPokemon.getPP(opponentMoveChoice) > 0) 
                {
                    opponentPokemon.attack(player1Pokemon, opponentMoveChoice);
                    validMoveSelected = true;
                } 
                else 
                {
                    console.log('No PP left for that move! Please choose another move.');
                }
            }
        } 
        else 
        {
            //"AI"
            let aiMoveChoice;
            do 
            {
                aiMoveChoice = Math.floor(Math.random() * 4);
            } while (opponentPokemon.getPP(aiMoveChoice) <= 0);

            opponentPokemon.attack(player1Pokemon, aiMoveChoice);
        }

        if (player1Pokemon.getHealth() <= 0) 
        {
            console.log(`${player1Pokemon.getName()} has fainted! ${opponentPokemon.getName()} wins!`);
            break;
        }
    }
}

battle();
