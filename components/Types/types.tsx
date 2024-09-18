export type BattlePokemon = {
    name: string;
    pokemonId: number;
    type: string;

}

export interface TeamDetailsProps {
    route: {
        params: {
            pokemonId: string;
            pokemonTeam: BattlePokemon[]
        };
    };
    navigation: any;
}