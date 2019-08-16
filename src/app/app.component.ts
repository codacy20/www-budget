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
  total = 0;
  expenseArray: Expense[] = [];
  categories = ['Business travel', 'Public relations, promotion and advertising', 'Office supplies',
    'Insurance', 'Education', 'Rent, phones, utilities'];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.clearFilters();
  }

  deleteItem(value: Expense) {
    for (let index = 0; index < this.expenseArray.length; index++) {
      if (value.name === this.expenseArray[index].name && value.date === this.expenseArray[index].date) {
        this.expenseArray.splice(index, 1);
        this.appService.deleteExpense(value._id).subscribe();
      }
    }
    this.getTotal();
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
      this.getTotal();
    });
  }

  chosenMonthHandler(value: MatDatepickerInputEvent<Date>, datepicker: MatDatepicker<any>) {
    this.startDate.setValue(value);
    const date = new Date(value.toString());
    this.appService.getExpensesByDate(`${date.getFullYear()}-${date.getMonth() + 1}`)
      .subscribe(data => { this.expenseArray = data; this.getTotal(); });
    datepicker.close();
  }

  clearFilters() {
    this.appService.getExpenses().subscribe(data => { this.expenseArray = data; this.getTotal(); });
  }

  getTotal() {
    this.total = 0;
    // tslint:disable-next-line: prefer-const
    for (let index of this.expenseArray) {
      this.total += index.price;
    }
  }
}
