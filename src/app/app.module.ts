import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { InfoComponent } from './components/info/info.component';
import { SelectYearComponent } from './components/select-year/select-year.component';

@NgModule({
  declarations: [AppComponent, InfoComponent, SelectYearComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
