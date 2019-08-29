import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { FilteredData } from '../../models/FilteredData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() data: FilteredData;
  @Input() year: string;
  chart: any;

  constructor() {}

  ngOnChanges() {
    if (this.data.chartLabels.length > 0 && this.chart) this.updateChart();
    if (this.data.chartLabels.length > 0 && !this.chart) this.createChart();
  }

  ngOnInit() {}

  createChart(): void {
    const chartData = {
      labels: this.data.chartLabels,
      datasets: [
        {
          type: 'line',
          label: 'Max temp',
          data: this.data.max_temps,
          backgroundColor: 'red',
          borderColor: 'red',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'line',
          label: 'Min temp',
          data: this.data.min_temps,
          backgroundColor: 'blue',
          borderColor: 'blue',
          tension: 0,
          fill: false,
          yAxisID: 'Y-left'
        },
        {
          type: 'bar',
          label: 'Precipitation',
          data: this.data.precip,
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
            type: 'time',
            time: {
              displayFormats: {
                month: 'MMM'
              },
              tooltipFormat: 'MMM DD, YYYY'
            },
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

  updateChart() {
    this.chart.data.labels = this.data.chartLabels;
    this.chart.data.datasets[0].data = this.data.max_temps;
    this.chart.data.datasets[1].data = this.data.min_temps;
    this.chart.data.datasets[2].data = this.data.precip;
    this.chart.update();
  }
}
