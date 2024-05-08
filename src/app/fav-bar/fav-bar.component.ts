import { Component, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { PokemonDetail } from '../Models/Pokemon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-fav-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './fav-bar.component.html',
  styleUrl: './fav-bar.component.css'
})
export class FavBarComponent {

  //property for data binding
  @Input() favPokemon!: PokemonDetail;

  constructor( private dialog: MatDialog ){};

  openDialog(pokemon: PokemonDetail) {
    this.dialog.open(DialogComponent, {
      width: '520px',
      data: pokemon,
    });
  };
}
