import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { DatepickercustomComponent } from './datepickercustom/datepickercustom.component';

const modules = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  MatChipsModule,
  MatIconModule,
  MatTabsModule,
  ChartsModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
];

@NgModule({
  declarations: [AppComponent, ChartComponent, TimesheetComponent, DatepickercustomComponent],
  imports: [modules],
  exports: [modules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
