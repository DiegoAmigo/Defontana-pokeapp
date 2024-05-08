import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PokemonDetail } from '../Models/Pokemon';
import { DetailsComponent } from "../details/details.component";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css',
    imports: [MatDialogModule, DetailsComponent, MatButtonModule]
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PokemonDetail,
  ) {};

  ngOnInit(): void {
      console.log(this.data);
  };
}
