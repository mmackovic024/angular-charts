import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent implements OnChanges {
  @Input() availableYears: string[];
  @Output() selectEvent = new EventEmitter<string>();
  yearSelector = new FormControl('');

  constructor() {}

  ngOnChanges() {
    this.yearSelector.setValue(this.availableYears[this.availableYears.length - 1]);
  }

  selectYear() {
    this.selectEvent.emit(this.yearSelector.value);
  }
}
