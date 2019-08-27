import { Component, OnChanges, Input } from '@angular/core';
import { FilteredData } from '../../models/FilteredData';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnChanges {
  @Input() data: FilteredData;
  @Input() year: string;
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
  }
}
