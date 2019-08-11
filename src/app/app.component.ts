import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Expense } from './Models/expense.interface';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

export const MY_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: { month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric' }
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AppComponent implements OnInit {

  startDate = new FormControl(new Date());
  title = 'www-budget';
  expenseArray: Expense[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getExpenses().subscribe(data => this.expenseArray = data);
  }

  deleteItem(value: Expense) {
    for (let index = 0; index < this.expenseArray.length; index++) {
      if (value.name === this.expenseArray[index].name && value.date === this.expenseArray[index].date) {
        this.expenseArray.splice(index, 1);
        this.appService.deleteExpense(value._id).subscribe();
      }
    }
  }

  expenseSubmit(value: any) {
    const tempExpense: Expense = {
      _id: '0',
      name: value.itemName,
      date: value.date,
      location: value.location,
      price: value.price
    };
    this.appService.postExpenses(tempExpense).subscribe(result => {
      tempExpense._id = result._id;
      this.expenseArray.push(tempExpense);
    });
  }

  chosenMonthHandler(value: MatDatepickerInputEvent<Date>, datepicker: MatDatepicker<any>) {
    this.startDate.setValue(value);
    const date = new Date(value.toString());
    this.appService.getExpensesByDate(`${date.getFullYear()}-${date.getMonth() + 1}`).subscribe(data => this.expenseArray = data);
    datepicker.close();
  }
}
