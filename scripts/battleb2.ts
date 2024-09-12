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

// Define a type for Pokémon
type Pokemon = {
  level: number;
  stats: Stats;
  types: [string, string?]; // Two types for dual-type Pokémon
  isReflectUp: boolean;
  isLightScreenUp: boolean;
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
  
  // Example usage: Checking the effectiveness of Fire against Grass
  const fireAgainstGrass = typeChart[1][4]; // Fire(1) against Grass(4)
  console.log(`Fire is ${fireAgainstGrass}x effective against Grass.`);
  

  return 1;
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
  attacker: Pokemon,
  defender: Pokemon,
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
  } else {
    // Apply Reflect or Light Screen based on move type and conditions
    if (move.isPhysical && defender.isReflectUp) {
      defense *= 2;
    }
    if (!move.isPhysical && defender.isLightScreenUp) {
      defense *= 2;
    }

    // Explosion or Selfdestruct halves the defender's defense
    if (move.power === 170 || move.power === 130) { // Assuming Explosion = 170, Selfdestruct = 130
      defense = Math.max(1, Math.floor(defense / 2));
    }
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
