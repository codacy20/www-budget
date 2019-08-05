import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

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

  addExpense(value) {
    this.expenseArray.push(value);
  }

  deleteItem(value) {
    for (let index = 0; index < this.expenseArray.length; index++) {
      if (value === this.expenseArray[index]) {
        this.expenseArray.splice(index, 1);
      }
    }
  }

  expenseSubmit(value: any) {
    this.expenseArray.push(value.expense);
    console.log(this.expenseArray);
  }
}
