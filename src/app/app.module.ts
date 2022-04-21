import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, TableModule, NgbModule, ReactiveFormsModule, DropdownModule, MultiSelectModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
