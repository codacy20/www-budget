import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Period } from '../Models/timesheet.interface';
import { Timesheet } from '../Models/timesheet.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly ROOT_URL = 'http://localhost:3000/timesheet';
  timePeriod: any;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getTimePeriod(): Observable<Period[]> {
    return (this.timePeriod = this.http.get<Period[]>(this.ROOT_URL).pipe(catchError(this.errorHandler)));
  }

  async getTimePeriodByDate(date: Date) {
    const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return (this.timePeriod = this.http
      .get<Period>(this.ROOT_URL + '/' + formatedDate)
      .pipe(catchError(this.errorHandler))).toPromise();
  }

  postTimesheet(formValue: Timesheet): Observable<Period> {
    return this.http
      .post<any>(this.ROOT_URL + '/update', {
        category: formValue.category,
        date: formValue.date,
        hours: formValue.hours,
      })
      .pipe(catchError(this.errorHandler));
  }

  stopStartPeriod(monthYear: { month: number; year: number }): Observable<Period> {
    const month = monthYear.month;
    const year = monthYear.year;
    return this.http
      .post<any>(this.ROOT_URL + '/stopStart', {
        month,
        year,
      })
      .pipe(catchError(this.errorHandler));
  }

  checkPeriod(date: Date, fetchPeriod: Period[]): Period {
    fetchPeriod.forEach((element: Period) => {
      if (element.month === date.getMonth() + 1 && element.year === date.getFullYear()) {
        return element;
      }
    });
    return null;
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
