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
  fetchedPeriod: Period[] = [];
  dataSourceHours: Timesheet[];
  totalHours = 0;
  activities = [];
  addNewTask = false;
  startDate = new FormControl(new Date());
  dateChild = new Date();
  selectedPeriod: Period = null;

  constructor(private service: AppService) {}

  async ngOnInit() {
    this.fetchPeriod();
    await this.lookForPeriod(new Date());
  }

  fetchActivities() {
    this.totalHours = 0;
    this.activities = [];
    this.fetchedPeriod[0].timeslots.forEach((element: Timesheet) => {
      this.totalHours += element.hours;
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

  chosenMonthHandler(value: MatDatepickerInputEvent<Date>, datepicker?: MatDatepicker<any>) {
    this.startDate.setValue(value);
    const date = new Date(value.toString());
    this.lookForPeriod(date);
    datepicker.close();
  }

  lookForPeriod(date: Date): Promise<Period> {
    const result = this.service.checkPeriod(date, this.fetchedPeriod);
    if (result) {
      this.selectedPeriod = result;
      // return this.selectedPeriod;
    }
    this.selectedPeriod = null;
  }

  recieveMessage($event) {
    this.dateChild = new Date($event.value);
    this.fetchPeriodbyDate(this.dateChild);
  }

  fetchPeriod() {
    return this.service.getTimePeriod().subscribe((data: Period[]) => {
      this.fetchedPeriod = data;
      // this.dataSourceHours = data[0].timeslots; // have to fix this. [0]??
      // this.fetchActivities();
      // console.log(data[0]);
    });
  }

  async fetchPeriodbyDate(dateChild: Date) {
    return await this.service.getTimePeriodByDate(dateChild).then(
      (data: Period) => {
        this.fetchedPeriod.push(data);
        this.dataSourceHours = data.timeslots;
        this.fetchActivities();
      },
      err => {
        this.service.openSnackBar('Sorry failed to call the mothership');
        this.dataSourceHours = [];
      },
    );
  }

  postTimeslots(formValue: Timesheet) {
    this.service.postTimesheet(formValue).subscribe(
      result => {
        this.service.openSnackBar('Well Done!');
        this.dataSourceHours = result.timeslots;
        this.fetchActivities();
      },
      err => this.service.openSnackBar('Sorry failed to call the mothership'),
    );
  }

  stopStartPeriod() {
    const monthYear = this.getMonthYear(this.startDate);
    this.service.stopStartPeriod(monthYear).subscribe(
      (result: Period) => {
        // TODO UPDATE THE HTML ELEMENT USING FINISHED
        this.fetchedPeriod[0] = result;
        console.log(this.fetchedPeriod);
        if (result.finished) this.service.openSnackBar('Period was started');
        else this.service.openSnackBar('Period was ended');
      },
      err => this.service.openSnackBar('Sorry failed to call the mothership, Check the console'),
    );
  }

  getMonthYear(startDate: FormControl) {
    const monthYear = new Date(startDate.value);
    return { month: monthYear.getMonth() + 1, year: monthYear.getFullYear() };
  }
}
