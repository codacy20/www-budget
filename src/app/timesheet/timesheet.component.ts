import { Component, OnInit } from '@angular/core';
import { Period } from '../Models/timesheet.interface';
import { Timesheet } from '../Models/timesheet.interface';

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

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  displayedColumns: string[] = ['hour', 'date', 'category'];
  dataSource = ELEMENT_DATA[0].hours;
  totalHours = 0;
  activities = [];
  addNewTask = false;

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
}
