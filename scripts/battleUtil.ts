import * as SQLite from 'expo-sqlite'
import { debugGetAllTeams } from '../components/db-functions/db-functions.js';
debugGetAllTeams
//TODO Call Teams from Database: 
//TODO Create new GetAllTeams Query Where the user.id wants the pkmn team
//TODO Also grab the pokemon from the table. Those pokemon have moves =>
//TODO Also grab the move ids ... atknum, special, pp, type (Those 4 all I need)

// Define the type for Pokémon stats
type Stats = {
  attack: number;
  defense: number;
  special: number;
  speed: number;
  hp: number;
};

// Define a type for Move
type Move = {
  power: number;
  type: string;
  isPhysical: boolean;  // True if it's physical, false if special
};

/**
 * BattlePokemon:
 * Handles the turn-based battle system by switching between active Pokémon and fetching data from the current battle state (using pokemon.id).
 *
 * Process Flow:
 * 1. Both users select their starting Pokémon (BattlePokemon.id).
 * 2. Both users choose a move.
 * 3. Pokémon with higher Speed (pokemon.speed) attacks first.
 *
 * Example:
 * Pikachu (id: 25) vs Bulbasaur (id: 1)
 * - Pikachu has higher Speed than Bulbasaur.
 * - Pikachu attacks first with move1.
 *
 * Damage Calculation:
 * 1. Store currDamage = move1.dmg (base damage of the move).
 * 2. Calculate STAB (Same-Type Attack Bonus) if applicable:
 *    - If move1.type matches the Pokémon’s type (e.g., Pikachu using an Electric-type move), apply a 1.5x damage multiplier.
 * 
 * Turn Resolution:
 * 1. Apply Pikachu’s damage to Bulbasaur from the current battle state.
 * 2. Check if Bulbasaur survives.
 *    - If Bulbasaur survives, it attacks next.
 *    - If Bulbasaur’s hp <= 0, it faints.
 *
 * Next Steps:
 * - If both Pokémon used their attacks, proceed to a new turn.
 * - If one Pokémon faints, prompt the player to select another Pokémon if available.
 * - If all Pokémon on a team have fainted, the player loses the battle.
 * 
 * Repeat until one side loses all their Pokémon.
 */

type BattlePokemon = {
  level: 100;
  stats: Stats;
  move1: Move;
  move2: Move;
  move3: Move;
  move4: Move;
  types: [string, string?]; // Two types for dual-type Pokémon
};

// Calculate effectiveness for a move against a Pokémon's types
function calculateTypeEffectiveness(moveType: string, defenderTypes: [string, string?]): number {
  const effectiveness1 = getTypeEffectiveness(moveType, defenderTypes[0]);
  const effectiveness2 = defenderTypes[1] ? getTypeEffectiveness(moveType, defenderTypes[1]) : 1;
  
  return effectiveness1 * effectiveness2;
}

// Stub for type effectiveness lookup
function getTypeEffectiveness(moveType: string, targetType: string): number {
  
  const types = [
    "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison",
    "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon"
  ];
  
  const typeChart: number[][] = [
    // Normal Fire  Water Electric Grass  Ice  Fight Poison Ground Flying Psychic Bug   Rock  Ghost Dragon
    [ 1,     1,    1,    1,       1,     1,   1,    1,     1,     1,     1,      1,    0.5,  0,    1    ], // Normal
    [ 1,     0.5,  0.5, 1,       2,     2,   1,    1,     1,     1,     1,      2,    0.5,  1,    0.5  ], // Fire
    [ 1,     2,    0.5, 1,       0.5,   1,   1,    1,     2,     1,     1,      1,    2,    1,    0.5  ], // Water
    [ 1,     1,    2,    0.5,    0.5,   1,   1,    1,     0,     2,     1,      1,    1,    1,    0.5  ], // Electric
    [ 1,     0.5,  2,    1,      0.5,   1,   1,    0.5,   2,     0.5,   1,      0.5,  2,    1,    0.5  ], // Grass
    [ 1,     1,  0.5, 1,       2,     0.5, 1,    1,     2,     2,     1,      1,    1,    1,    2    ], // Ice
    [ 2,     1,    1,    1,      1,     2,   1,    0.5,   1,     0.5,   0.5,    0.5,  2,    0,    1    ], // Fighting
    [ 1,     1,    1,    1,      2,     1,   1,    0.5,   0.5,   1,     1,      2,    0.5,  0.5,  1    ], // Poison
    [ 1,     2,    1,    2,      0.5,   1,   1,    2,     1,     0,     1,      0.5,  2,    1,    1    ], // Ground
    [ 1,     1,    1,    0.5,    2,     1,   2,    1,     1,     1,     1,      2,    0.5,  1,    1    ], // Flying
    [ 1,     1,    1,    1,      1,     1,   2,    2,     1,     1,     0.5,    1,    1,    1,    1    ], // Psychic
    [ 1,     0.5,  1,    1,      2,     1,   0.5,  2,     1,     0.5,   2,      1,    1,    0.5,  1    ], // Bug
    [ 1,     2,    1,    1,      1,     2,   0.5,  1,     0.5,   2,     1,      2,    1,    1,    1    ], // Rock
    [ 0,     1,    1,    1,      1,     1,   1,    1,     1,     1,     0,      1,    1,    2,    1    ], // Ghost
    [ 1,     1,    1,    1,      1,     1,   1,    1,     1,     1,     1,      1,    1,    1,    2    ], // Dragon
  ];
  
  let moveTypeIndex = -1;
  let targetTypeIndex = -1;

  // Find the index of the moveType and targetType
  for (let i = 0; i < types.length; i++) {
    if (types[i] === moveType) {
      moveTypeIndex = i;
    }
    if (types[i] === targetType) {
      targetTypeIndex = i;
    }
  }

  // If either type is not found, return 1 as default (neutral effectiveness)
  if (moveTypeIndex === -1 || targetTypeIndex === -1) {
    return 1;
  }

  // Return the effectiveness value from the typeChart (2, 1, 0.5)
  return typeChart[moveTypeIndex][targetTypeIndex];
}

// Calculate STAB
function calculateSTAB(attackerTypes: [string, string?], moveType: string): number {
  return attackerTypes.includes(moveType) ? 1.5 : 1;
}

// Calculate random factor between 217 and 255
function getRandomFactor(): number {
  return Math.floor(Math.random() * (255 - 217 + 1) + 217);
}

// Gen 1 damage formula
function calculateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  move: Move,
  criticalHit: boolean
): number {
  // Step 1: Handle Attack/Defense stats and caps for critical hit cases
  let attack = move.isPhysical ? attacker.stats.attack : attacker.stats.special;
  let defense = move.isPhysical ? defender.stats.defense : defender.stats.special;

  // Handle the >255 cap rule for Attack and Defense
  if (attack > 255 || defense > 255) {
    attack = Math.floor(attack / 4);
    defense = Math.floor(defense / 4);
  }

  // Step 2: Handle critical hit (ignores stat modifiers)
  if (criticalHit) {
    attack = move.isPhysical ? attacker.stats.attack : attacker.stats.special;
    defense = move.isPhysical ? defender.stats.defense : defender.stats.special;
  }

  //Pokemon should die after death causing move.
  // Explosion or Selfdestruct halves the defender's defense (Ignore this comment for halving defense.)
  if (move.power === 170 || move.power === 130) { // Assuming Explosion = 170, Selfdestruct = 130
    // defense = Math.max(1, Math.floor(defense / 2));
    attacker.status = false; //(faint)
  }

  // Step 3: Calculate base damage (simplified for readability)
  let baseDamage = Math.floor(
    (((2 * attacker.level / 5 + 2) * move.power * attack) / defense) / 50 + 2
  );

  // Step 4: Apply STAB (Same-Type Attack Bonus)
  baseDamage = Math.floor(baseDamage * calculateSTAB(attacker.types, move.type));

  // Step 5: Apply type effectiveness
  const typeEffectiveness = calculateTypeEffectiveness(move.type, defender.types);
  baseDamage = Math.floor(baseDamage * typeEffectiveness);

  // Step 6: Apply the random factor
  baseDamage = Math.floor((baseDamage * getRandomFactor()) / 255);

  // Step 7: Ensure minimum damage of 1
  if (baseDamage < 1) baseDamage = 1;

  return baseDamage;
}

//export battleb2 into react
