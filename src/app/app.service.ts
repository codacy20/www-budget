import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Expense } from './Models/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly ROOT_URL = 'http://localhost:3000';
  expenses: any;
  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.expenses = this.http.get<Expense[]>(this.ROOT_URL + '/expense').pipe(catchError(this.errorHandler));
  }

  getExpensesByDate(date: string) {
    return this.expenses = this.http.get<Expense[]>(this.ROOT_URL + '/expense/' + date).pipe(catchError(this.errorHandler));
  }

  postExpenses(expense: Expense): Observable<Expense> {
    return this.expenses = this.http.post<any>(this.ROOT_URL + '/expense', {
      name: expense.name,
      price: expense.price,
      location: expense.location,
      date: expense.date,
      category: expense.category
    }).pipe(catchError(this.errorHandler));
  }

  deleteExpense(name: string) {
    return this.expenses = this.http.delete<any>(`${this.ROOT_URL}/expense/${name}`).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error! Sorry');
  }
}
