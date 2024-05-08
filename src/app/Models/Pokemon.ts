import { Ability } from "./Ability";

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetail {
    abilities: [{ability: Ability}];
    base_experience: number;
    height: number;
    id: number;
    name: string;
    weight: number;
}

export interface Pokemons {
    count: number;
    results: Pokemon[];
}