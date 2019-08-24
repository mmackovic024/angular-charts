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
  chart = [];

  constructor(private http: DataService) {}

  ngOnInit() {
    this.http.fetchData().subscribe(data => {
      let max_temps = data.temps
        .filter(day => day.date.slice(11, 15) === '2019')
        .map(day => day.high);
      let min_temps = data.temps
        .filter(day => day.date.slice(11, 15) === '2019')
        .map(day => day.low);
      let dates = data.temps
        .filter(day => day.date.slice(11, 15) === '2019')
        .map(day => {
          return day.date.slice(4, 15);
        });
      let precip = data.precip
        .filter(day => day.date.slice(11, 15) === '2019')
        .map(day => day.precip);

      this.chart = new Chart('chart', {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              data: max_temps,
              borderColor: 'red',
              tension: 0,
              fill: false
              // pointStyle: 'dash'
            },
            {
              data: min_temps,
              borderColor: 'blue',
              tension: 0,
              fill: false
              // pointStyle: 'dash'
            },
            {
              data: precip,
              borderColor: 'yellow',
              tension: 0,
              fill: false
              // pointStyle: 'dash'
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }
}
