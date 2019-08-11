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
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    modules
  ],
  exports: [
    modules
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
