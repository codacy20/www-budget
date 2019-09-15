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

  getTimePeriodByDate(date: Date) {
    const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return (this.timePeriod = this.http
      .get<Period>(this.ROOT_URL + '/' + formatedDate)
      .pipe(catchError(this.errorHandler)));
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 2000,
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error! Sorry');
  }
}
