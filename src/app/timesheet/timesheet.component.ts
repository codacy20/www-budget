import { Component, OnInit } from '@angular/core';
import { Period } from '../Models/timesheet.interface';
import { Timesheet } from '../Models/timesheet.interface';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepicker, MAT_DATE_FORMATS } from '@angular/material';

const ELEMENT_DATA: Period[] = [
  {
    finished: true,
    start: new Date(),
    end: new Date(),
    hours: [
      { hour: 2, date: new Date(), category: 'some project' },
      { hour: 2, date: new Date(), category: 'some project' },
      { hour: 2, date: new Date(), category: 'some project' },
      { hour: 2, date: new Date(), category: 'some project' },
    ],
  },
];
export const MY_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: { day: 'numeric', month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric' },
  },
};

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  displayedColumns: string[] = ['hour', 'date', 'category'];
  dataSource = ELEMENT_DATA[0].hours;
  totalHours = 0;
  activities = [];
  addNewTask = false;
  startDate = new FormControl(new Date());

  constructor() {}

  ngOnInit() {
    this.dataSource.forEach((element: Timesheet) => {
      this.totalHours += element.hour;
      this.activities.push(element.category);
    });
  }

  getDaysInMonth(month: number, year: number) {
    const date = new Date(month, year, 0).getDate();
    return date;
  }

  showAddNewTask() {
    this.addNewTask = !this.addNewTask;
  }

  chosenMonthHandler(value: MatDatepickerInputEvent<Date>, datepicker: MatDatepicker<any>) {
    this.startDate.setValue(value);
    const date = new Date(value.toString());
    datepicker.close();
  }
}
