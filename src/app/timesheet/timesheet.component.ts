import { Component, OnInit } from '@angular/core';
import { Period } from '../Models/timesheet.interface';
import { Timesheet } from '../Models/timesheet.interface';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
import { AppService } from './timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
})
export class TimesheetComponent implements OnInit {
  displayedColumns: string[] = ['hour', 'date', 'category'];
  dataSourceFetch: Period[];
  dataSourceHours: Timesheet[];
  totalHours = 0;
  activities = [];
  addNewTask = false;
  startDate = new FormControl(new Date());
  dateChild = new Date();

  constructor(private service: AppService) {}

  ngOnInit() {}

  // fetchActivities() {
  //   this.dataSourceFetch[0].hours.forEach((element: Timesheet) => {
  //     this.totalHours += element.hour;
  //     this.activities.push(element.category);
  //   });
  // }

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

  recieveMessage($event) {
    this.dateChild = new Date($event.value);
    this.fetchPeriod(this.dateChild);
  }

  fetchPeriod(dateChild: Date) {
    return this.service.getTimePeriod().subscribe((data: Period[]) => {
      this.dataSourceFetch = data;
      this.dataSourceHours = data[0].timeslots;
      console.log(data[0]);
    });
  }

  postTimeslots(formValue: Timesheet) {
    this.service.postTimesheet(formValue).subscribe(result => {
      // tempExpense._id = result._id;
      this.dataSourceHours.push(result);
    });
  }
}
