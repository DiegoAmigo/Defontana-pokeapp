import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resume-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './resume-table.component.html',
  styleUrl: './resume-table.component.css',
  providers: [AppService],
})
export class ResumeTableComponent implements OnInit {
  //property for data binding
  @Input() resultsLength!: number;

  lettersData = new MatTableDataSource<{letter: string, quantity: number}>();
  displayedColumns: string[] = ['letter', 'quantity'];
  isLoading: Boolean = true;

  constructor(private appService: AppService) {};


  ngOnInit(): void {
    this.appService.getPokemonsCountByFirstLetter(this.resultsLength).subscribe(values => {
      this.lettersData.data = Object.keys(values).map((letter) => {
        const quantity = values[letter];
        return { letter, quantity };
      });
      this.isLoading = false;
    });
  };

}

