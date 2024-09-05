class pokemon {
    constructor(name, health, moves, attackDamage, pp) {
        this.name = name;
        this.health = health;
        this.moves = moves;
        this.attackDamage = attackDamage;
        this.pp = pp;
    }

    attack(target, moveIndex) 
    {
        if (this.pp[moveIndex] > 0) 
        {
            console.log(`${this.name} attacks with ${this.moves[moveIndex]}!`);
            target.takeDamage(this.attackDamage[moveIndex]);
            this.pp[moveIndex]--;
        } 
        else 
        {
            console.log(`${this.name} has no PP left for ${this.moves[moveIndex]}!`);
        }
    }

    takeDamage(damage) 
    {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        console.log(`${this.name} took ${damage} damage! Current health: ${this.health}`);
    }

    displayStats() 
    {
        console.log(`Name: ${this.name}`);
        console.log(`Health: ${this.health}`);
        for (let i = 0; i < this.moves.length; i++) 
        {
            console.log(`Move ${i + 1}: ${this.moves[i]} (Damage: ${this.attackDamage[i]}, PP: ${this.pp[i]})`);
        }
    }

    displayMoves() {
        console.log(`${this.name}'s available moves:`);
        for (let i = 0; i < this.moves.length; i++) 
        {
            console.log(`${i + 1}. ${this.moves[i]} (Damage: ${this.attackDamage[i]}, PP: ${this.pp[i]})`);
        }
    }

    getHealth() {
        return this.health;
    }

    getPP(moveIndex) {
        return this.pp[moveIndex];
    }

    getName() {
        return this.name;
    }
}

module.exports = pokemon;