import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'www-budget';
  expenseArray = []

  addExpense(value) {
    this.expenseArray.push(value);
  }

  deleteItem(value) {
    for (let index = 0; index < this.expenseArray.length; index++) {
      if (value == this.expenseArray[index]) {
        this.expenseArray.splice(index, 1);
      }
    }
  }

  expenseSubmit(value: any) {
    this.expenseArray.push(value.expense);
    console.log(this.expenseArray);
    
  }
}
