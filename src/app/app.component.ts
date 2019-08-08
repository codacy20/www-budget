import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Expense } from './Models/expense.interface';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
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

  chosenMonthHandler(datepicker: MatDatepicker<any>) {
    this.startDate = new Date(1990, 0, 1);
    datepicker.close();
  }
}
