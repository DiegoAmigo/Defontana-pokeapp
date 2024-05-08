import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Pokemon, PokemonDetail } from '../Models/Pokemon';
import { MatSort } from '@angular/material/sort';
import { AppService } from '../app.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [AppService],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSourcePokemons = new MatTableDataSource<Pokemon>();
  pokemonDetails: PokemonDetail | undefined;
  isLoadingResults = true;
  resultsLength = 0;
  pageIndex: number = 0;
  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  pageSize: number = 10;
  private url: string;

  //events for the data binding
  @Output() selectedPokemon = new EventEmitter<PokemonDetail>();
  @Output() dataLength = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private appService: AppService) {
    this.url = "https://pokeapi.co/api/v2/";
  };

  openDetails(row: Pokemon) {
    this.appService.getPokemonInfo(row.url).subscribe(values => { 
      this.pokemonDetails = values;
      this.selectedPokemon.emit(this.pokemonDetails);
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePokemons.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcePokemons.paginator) {
      this.dataSourcePokemons.paginator.firstPage();
    }
    const keyboardEv = event as KeyboardEvent;
    if (keyboardEv.key === 'Enter' && filterValue.length !== 0) {
      this.appService.getPokemonInfo(undefined, this.dataSourcePokemons.filter).subscribe(value => {
        if (value.name !== undefined) {
          const name = value.name;
          const url = `${this.url}pokemon/${name}`;
          this.dataSourcePokemons.data = [{name, url}];
        }
      });
    } else if (keyboardEv.key === 'Enter' && filterValue.length === 0) {
        this.appService.getPokemons(this.pageSize, this.pageIndex).subscribe(values => { 
          this.dataSourcePokemons.data = values.results;
          this.resultsLength = values.count;
          this.isLoadingResults = false;
          this.dataLength.emit(values.count);
        });
    }
  };

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.isLoadingResults = true;
    this.appService.getPokemons(this.pageSize, this.pageIndex).subscribe(values => {
      this.dataSourcePokemons.data = values.results;
      this.isLoadingResults = false;
    });
  };

  ngOnInit() {
    this.appService.getPokemons(this.pageSize, this.pageIndex).subscribe(values => { 
      this.dataSourcePokemons.data = values.results;
      this.resultsLength = values.count;
      this.isLoadingResults = false;
      this.dataLength.emit(values.count);
    });
  };
}
