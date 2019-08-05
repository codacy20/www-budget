import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Expense } from './Models/expense.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'www-budget';
  expenseArray = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getExpenses().subscribe(data => this.expenseArray = data);
  }

  deleteItem(value) {
    for (let index = 0; index < this.expenseArray.length; index++) {
      if (value === this.expenseArray[index]) {
        this.expenseArray.splice(index, 1);
      }
    }
  }

  expenseSubmit(value: any) {
    const tempExpense: Expense = {
      name: value.itemName,
      date: value.date,
      location: value.location,
      price: value.price
    };
    this.expenseArray.push(tempExpense);
    console.log(this.expenseArray);
  }
}
