import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getDaysInMonth(month: number, year: number) {
    const date = new Date(month, year, 0).getDate();
    return date;
  }

}
