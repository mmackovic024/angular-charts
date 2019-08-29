import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FilteredData } from './models/FilteredData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-charts';
  years: string[] = [];
  selectedYear: string;
  data: any;
  filteredData: FilteredData = {
    max_temps: [],
    min_temps: [],
    precip: [],
    chartLabels: []
  };

  constructor(private http: DataService) {}

  ngOnInit() {
    this.http.fetchData().subscribe(data => {
      this.data = { ...data };
      this.years = this.data.precip.reduce((years, day) => {
        if (!years.includes(day.date.slice(11, 15))) {
          years.push(day.date.slice(11, 15));
        }
        return years;
      }, []);
      this.selectedYear = this.years[this.years.length - 1];
      this.filterData(this.selectedYear);
    });
  }

  filterData(year: string): void {
    this.filteredData.max_temps = this.data.temps
      .filter(day => day.date.slice(11, 15) === year)
      .map(day => day.high);
    this.filteredData.min_temps = this.data.temps
      .filter(day => day.date.slice(11, 15) === year)
      .map(day => day.low);
    this.filteredData.precip = this.data.precip
      .filter(day => day.date.slice(11, 15) === year)
      .map(day => day.precip);
    this.filteredData.chartLabels = this.data.temps
      .filter(day => day.date.slice(11, 15) === year)
      .map(day => day.date.slice(4, 15));
  }

  onChange(year: string): void {
    this.selectedYear = year;
    this.filterData(this.selectedYear);
  }
}
