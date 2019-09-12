import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material';
import { FormControl } from '@angular/forms';
export const MY_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric' },
  },
};

@Component({
  selector: 'app-datepickercustom',
  templateUrl: './datepickercustom.component.html',
  styleUrls: ['./datepickercustom.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class DatepickercustomComponent implements OnInit {
  startDate = new FormControl(new Date());

  @Output() messageEvent = new EventEmitter<FormControl>();
  constructor() {}

  ngOnInit() {}

  sendMessage() {
    this.messageEvent.emit(this.startDate);
  }
}
