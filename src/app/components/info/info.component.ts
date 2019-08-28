import { Component, OnChanges, Input } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { FilteredData } from '../../models/FilteredData';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  animations: [
    trigger('animation', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('1000ms ease-out')
      ])
    ])
  ]
})
export class InfoComponent implements OnChanges {
  @Input() data: FilteredData;
  @Input() year: string;
  prevYear: string = '';
  hotDays: number;
  coldDays: number;
  rainyDays: number;

  constructor() {}

  ngOnChanges() {
    this.hotDays = this.data.max_temps.reduce((acc, temp) => {
      if (temp > 30) ++acc;
      return acc;
    }, 0);
    this.coldDays = this.data.min_temps.reduce((acc, temp) => {
      if (temp < -5) ++acc;
      return acc;
    }, 0);
    this.rainyDays = this.data.precip.reduce((acc, prec) => {
      if (prec > 0) ++acc;
      return acc;
    }, 0);
    this.prevYear = this.year;
  }
}
