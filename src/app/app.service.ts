import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonDetail, Pokemons } from './Models/Pokemon';
import { letters } from './utils/letters';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url: string;
  constructor(private http: HttpClient) {
    this.url = "https://pokeapi.co/api/v2/";
  }
  
  //All pokemons
  getPokemons(pageSize: number, index: number): Observable<Pokemons> {
    return this.http.get<any>(`${this.url}pokemon?limit=${pageSize}&offset=${pageSize*index}`).pipe(map(response => {return response}));
  };

  //Get one pokemon by url or name
  getPokemonInfo(url: string | undefined = '', name?: string): Observable<PokemonDetail> {
    if (name) return this.http.get<any>(`${this.url}pokemon/${name}`); 
    else return this.http.get<any>(url);
  };

  //count by first letter
  getPokemonsCountByFirstLetter(total: number): Observable<letters> {
    return this.getPokemons(total, 0).pipe(
      map(response => {
        let countByFirstLetter: letters = {};
        response.results.forEach(pokemon => {
          const firstLetter = pokemon.name.charAt(0).toUpperCase();
          countByFirstLetter[firstLetter] = countByFirstLetter[firstLetter] !== undefined ? countByFirstLetter[firstLetter] + 1 : 0;
        });
        return countByFirstLetter;
      })
    )
  }
}