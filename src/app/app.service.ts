import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Expense } from './Models/expense.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly ROOT_URL = 'http://localhost:3000/expense';
  expenses: any;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getExpenses(): Observable<Expense[]> {
    return (this.expenses = this.http.get<Expense[]>(this.ROOT_URL).pipe(catchError(this.errorHandler)));
  }

  getExpensesByDate(date: string) {
    return (this.expenses = this.http
      .get<Expense[]>(this.ROOT_URL + '/date=' + date)
      .pipe(catchError(this.errorHandler)));
  }

  postExpenses(expense: Expense): Observable<Expense> {
    return (this.expenses = this.http
      .post<any>(this.ROOT_URL, {
        name: expense.name,
        price: expense.price,
        location: expense.location,
        date: expense.date,
        category: expense.category,
        vat: expense.vat,
      })
      .pipe(catchError(this.errorHandler)));
  }

  deleteExpense(name: string) {
    return (this.expenses = this.http.delete<any>(`${this.ROOT_URL}/${name}`).pipe(catchError(this.errorHandler)));
  }

  postFile(fileToUpload: File, id: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post<any>(this.ROOT_URL + '/upload/' + id, formData).pipe(catchError(this.errorHandler));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 2000,
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error! Sorry');
  }
}
