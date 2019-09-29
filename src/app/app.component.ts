import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Expense } from './Models/expense.interface';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
export const MY_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: { month: 'short', year: 'numeric' },
    monthYearLabel: { year: 'numeric' },
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class AppComponent implements OnInit {
  startDate = new FormControl(new Date());
  title = 'www-budget';
  total = 0;
  expenseArray: Expense[] = [];
  categories = [
    'Business travel',
    'Public relations, promotion and advertising',
    'Office supplies',
    'Insurance',
    'Education',
    'Rent, phones, utilities',
  ];
  category = this.categories[0];
  fileToUpload: File = null;

  constructor(private appService: AppService, public dialog: MatDialog) {}

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

  openDialog(expense: Expense) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteItem(expense);
    });
  }

  expenseSubmit(value: any) {
    const tempExpense: Expense = {
      _id: '0',
      name: value.itemName,
      date: value.date,
      location: value.location,
      price: value.price,
      category: value.category,
      vat: value.vat,
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
    this.appService.getExpensesByDate(`${date.getFullYear()}-${date.getMonth() + 1}`).subscribe(data => {
      this.expenseArray = data;
      this.getTotal();
    });
    datepicker.close();
  }

  clearFilters() {
    this.appService.getExpenses().subscribe(data => {
      this.expenseArray = data;
      this.getTotal();
    });
  }

  handleFileInput(files: FileList, id: string, name: string) {
    console.log(id);
    console.log(name);
    // this.fileToUpload = files.item(0);
    // this.uploadFileToActivity(id);
  }

  uploadFileToActivity(id: string) {
    this.appService.postFile(this.fileToUpload, id).subscribe(
      data => {
        this.appService.openSnackBar('Upload was successful!');
      },
      error => {
        this.appService.openSnackBar(error);
      },
    );
  }

  getTotal() {
    this.total = 0;
    // tslint:disable-next-line: prefer-const
    for (let index of this.expenseArray) {
      this.total += index.price;
    }
  }
}
