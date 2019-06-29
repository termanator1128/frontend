import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RxTableComponent} from './rx-table/rx-table.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule, CardModule, FieldsetModule} from "primeng/primeng";
import {PtSummaryComponent} from './pt-summary/pt-summary.component';
import {PtNotesComponent} from './pt-notes/pt-notes.component';
import {QuillModule} from "ngx-quill";
import {RxFormComponent} from './rx-form/rx-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RxTableComponent,
    PtSummaryComponent,
    PtNotesComponent,
    RxFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    CalendarModule,
    CardModule,
    FieldsetModule,
    QuillModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
