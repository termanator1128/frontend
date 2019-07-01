import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {TableModule} from 'primeng/table'
import {DialogModule} from 'primeng/dialog'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ButtonModule} from 'primeng/button'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {
  AutoCompleteModule,
  CalendarModule,
  CardModule,
  EditorModule,
  FieldsetModule,
  InputMaskModule,
  KeyFilterModule,
  RadioButtonModule,
  TabViewModule
} from 'primeng/primeng'
import {PtSummaryComponent} from './pt-page/pt-summary/pt-summary.component'
import {PtNotesComponent} from './pt-page/pt-tabs/pt-notes/pt-notes.component'
import {FormComponent} from './pt-page/pt-tabs/table/form/form.component'
import {PtPageComponent} from './pt-page/pt-page.component'
import {PtTabsComponent} from './pt-page/pt-tabs/pt-tabs.component'
import {TableComponent} from './pt-page/pt-tabs/table/table.component'
import {TabMenuModule} from 'primeng/tabmenu'
import {MainSearchComponent} from './components/main-search/main-search.component'
import {NgxsModule} from '@ngxs/store'
import {PortalState} from './state/portal.state'
import {NewPatientComponent} from './components/new-patient/new-patient.component'

@NgModule({
  declarations: [
    AppComponent,
    PtSummaryComponent,
    PtNotesComponent,
    FormComponent,
    PtPageComponent,
    PtTabsComponent,
    TableComponent,
    MainSearchComponent,
    NewPatientComponent,
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
    ReactiveFormsModule,
    TabViewModule,
    TabMenuModule,
    RadioButtonModule,
    AutoCompleteModule,
    InputMaskModule,
    KeyFilterModule,
    NgxsModule.forRoot([
      PortalState
    ]),
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
