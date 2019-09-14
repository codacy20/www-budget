import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Period } from '../Models/timesheet.interface';
import { Timesheet } from '../Models/timesheet.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly ROOT_URL = 'http://localhost:3000/timesheet';
  timePeriod: any;
  constructor(private http: HttpClient) {}

  getTimePeriod(): Observable<Period[]> {
    return (this.timePeriod = this.http.get<Period[]>(this.ROOT_URL).pipe(catchError(this.errorHandler)));
  }

  getTimePeriodByDate(date: string) {
    return (this.timePeriod = this.http
      .get<Period[]>(this.ROOT_URL + '/expense/' + date)
      .pipe(catchError(this.errorHandler)));
  }

  postTimesheet(formValue: Timesheet): Observable<Timesheet> {
    return this.http
      .post<any>(this.ROOT_URL + '/update', {
        category: formValue.category,
        date: formValue.date,
        hours: formValue.hours,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Server Error! Sorry');
  }
}
