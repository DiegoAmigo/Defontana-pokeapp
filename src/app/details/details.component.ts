import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { PokemonDetail } from '../Models/Pokemon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatListModule, MatDividerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  //properties for data binding
  @Input() pokemonDetails!: PokemonDetail;
  @Input() fromDialog!: boolean;

  //property that goes to another component
  @Output() favPokemon = new EventEmitter<PokemonDetail>;

  handleOnClick(e: Event) {
    this.favPokemon.emit(this.pokemonDetails);
  }
}
