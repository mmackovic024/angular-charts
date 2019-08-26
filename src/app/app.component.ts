import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-charts';
  chart: any;
  years = [];
  selectedYear = '2019';
  selectEl: any;
  data: any;

  constructor(private http: DataService) {}

  ngOnInit() {
    this.http.fetchData().subscribe(data => {
      this.selectEl = document.querySelector('#selectYear');
      this.data = data;
      this.createChart();
      // this.selectEl.value = this.selectedYear;
      setTimeout(() => (this.selectEl.value = this.selectedYear), 1);
    });
  }

  createChart() {
    let max_temps = this.data.temps
      .filter(day => day.date.slice(11, 15) === this.selectedYear)
      .map(day => day.high);
    let min_temps = this.data.temps
      .filter(day => day.date.slice(11, 15) === this.selectedYear)
      .map(day => day.low);
    let dates = this.data.temps
      .filter(day => day.date.slice(11, 15) === this.selectedYear)
      .map(day => {
        return day.date.slice(4, 15);
      });
    let precip = this.data.precip
      .filter(day => day.date.slice(11, 15) === this.selectedYear)
      .map(day => day.precip);
    this.years = this.data.precip.reduce((years, day) => {
      if (!years.includes(day.date.slice(11, 15))) {
        years.push(day.date.slice(11, 15));
      }
      return years;
    }, []);

    const chartData = {
      labels: dates,
      datasets: [
        {
          type: 'line',
          label: 'Max temp',
          data: max_temps,
          borderColor: 'red',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'line',
          label: 'Min temp',
          data: min_temps,
          borderColor: 'blue',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'bar',
          label: 'Precip',
          data: precip,
          backgroundColor: 'green',
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
            display: true
          }
        ],
        yAxes: [
          {
            id: 'Y-left',
            // type: 'linear',
            position: 'left',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'temp in °C'
            },
            ticks: {
              min: -30,
              max: 40
            }
          },
          {
            id: 'Y-right',
            // type: 'linear',
            position: 'right',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'precip in mm'
            },
            ticks: {
              min: 0,
              max: 70
            }
          }
        ]
      }
    };

    const ctx = document.getElementById('chart');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }

  onChange() {
    this.selectedYear = this.selectEl.value;
    this.chart.destroy();
    this.createChart();
  }
}
