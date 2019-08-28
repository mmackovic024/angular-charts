import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from './services/data.service';
import { FilteredData } from './models/FilteredData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-charts';
  chart: any;
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
      this.createChart();
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

  createChart(): void {
    const chartData = {
      labels: this.filteredData.chartLabels,
      datasets: [
        {
          type: 'line',
          label: 'Max temp',
          data: this.filteredData.max_temps,
          backgroundColor: 'red',
          borderColor: 'red',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'line',
          label: 'Min temp',
          data: this.filteredData.min_temps,
          backgroundColor: 'blue',
          borderColor: 'blue',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'bar',
          label: 'Precipitation',
          data: this.filteredData.precip,
          backgroundColor: 'green',
          borderColor: 'green',
          yAxisID: 'Y-right'
        }
      ]
    };

    const chartOptions = {
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              borderDash: [2, 2],
              lineWidth: 2
            },
            display: true
          }
        ],
        yAxes: [
          {
            gridLines: {
              borderDash: [2, 2]
            },
            id: 'Y-left',
            position: 'left',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'temperature in °C'
            },
            ticks: {
              min: -30,
              max: 40
            }
          },
          {
            gridLines: {
              borderDash: [2, 2]
            },
            id: 'Y-right',
            position: 'right',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'precipitation in mm'
            },
            ticks: {
              min: 0,
              max: 70
            }
          }
        ]
      }
    };

    this.chart = new Chart('chart', {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }

  onChange(year: string): void {
    this.selectedYear = year;
    this.filterData(this.selectedYear);
    this.chart.data.labels = this.filteredData.chartLabels;
    this.chart.data.datasets[0].data = this.filteredData.max_temps;
    this.chart.data.datasets[1].data = this.filteredData.min_temps;
    this.chart.data.datasets[2].data = this.filteredData.precip;
    this.chart.update();
  }
}
