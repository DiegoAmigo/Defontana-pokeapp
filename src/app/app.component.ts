import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table/table.component';
import { PokemonDetail } from './Models/Pokemon';
import { DetailsComponent } from "./details/details.component";
import { ResumeTableComponent } from "./resume-table/resume-table.component";
import { FavBarComponent } from "./fav-bar/fav-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TableComponent, DetailsComponent, ResumeTableComponent, FavBarComponent]
})
export class AppComponent {
  title = 'pokeapp';
  detailedPokemon: PokemonDetail | undefined;
  dataLength: number | undefined;
  favPokemon: PokemonDetail | undefined;

  //method for data binding the pokemon selected on the main table
  onSelected(selected: PokemonDetail) {
    this.detailedPokemon = selected;
  }
  //method for data binding the total of pokemons for the main table
  onDataLoaded(length: number) {
    this.dataLength = length;
  }
  //method for data binding the pokemon marked as favourite
  onSelectedFav(favPokemon: PokemonDetail) {
    this.favPokemon = favPokemon;
  }
}