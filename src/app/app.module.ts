import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

const modules = [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  BrowserAnimationsModule
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
