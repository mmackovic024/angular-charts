import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { SelectYearComponent } from './components/select-year/select-year.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DataService } from './services/data.service';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent, InfoComponent, SelectYearComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
