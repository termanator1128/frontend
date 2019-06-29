import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {RxTableComponent} from './pt-page/pt-tabs/rx-table/rx-table.component'
import {TableModule} from 'primeng/table'
import {DialogModule} from 'primeng/dialog'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ButtonModule} from 'primeng/button'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {CalendarModule, CardModule, FieldsetModule, RadioButtonModule, TabViewModule} from 'primeng/primeng'
import {PtSummaryComponent} from './pt-page/pt-summary/pt-summary.component'
import {PtNotesComponent} from './pt-page/pt-tabs/pt-notes/pt-notes.component'
import {QuillModule} from 'ngx-quill'
import {RxFormComponent} from './pt-page/pt-tabs/rx-form/rx-form.component'
import {PtPageComponent} from './pt-page/pt-page.component'
import {PtTabsComponent} from './pt-page/pt-tabs/pt-tabs.component'

@NgModule({
  declarations: [
    AppComponent,
    RxTableComponent,
    PtSummaryComponent,
    PtNotesComponent,
    RxFormComponent,
    PtPageComponent,
    PtTabsComponent
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
    ReactiveFormsModule,
    TabViewModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
