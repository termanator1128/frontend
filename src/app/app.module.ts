import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
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
  CheckboxModule,
  DialogService,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  InputMaskModule,
  InputTextModule,
  KeyFilterModule,
  MessageModule,
  MessagesModule,
  PasswordModule,
  RadioButtonModule,
  TabViewModule
} from 'primeng/primeng'
import {PtSummaryComponent} from './components/pt-summary/pt-summary.component'
import {PtNotesComponent} from './components/pt-notes/pt-notes.component'
import {FormComponent} from './components/form/form.component'
import {PtPageComponent} from './components/pt-page/pt-page.component'
import {PtTabsComponent} from './components/pt-tabs/pt-tabs.component'
import {TableComponent} from './components/table/table.component'
import {TabMenuModule} from 'primeng/tabmenu'
import {MainSearchComponent} from './components/main-search/main-search.component'
import {NgxsModule} from '@ngxs/store'
import {PortalState} from './state/portal.state'
import {NewPatientComponent} from './components/new-patient/new-patient.component'
import {environment} from '../environments/environment'
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {FormControlComponent} from './components/form-control/form-control.component'
import {SaveControllerComponent} from './components/save-controller/save-controller.component'
import {LoginComponent} from './components/login/login.component'
import {RouterModule, Routes} from '@angular/router'
import {AuthGuardService} from './services/auth-guard.service'
import {MainComponent} from './components/main/main.component'
import {AuthService} from './services/auth.service'
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt'
import {CookieService} from 'ngx-cookie-service'
import {ToastModule} from 'primeng/toast'
import {JwtInterceptor} from './services/jwt.interceptor'
import {CreateAccountComponent} from './components/create-account/create-account.component'
import {ProfilePreviewComponent} from './components/profile-preview/profile-preview.component'
import {ProfileComponent} from './components/profile/profile.component'
import {AlternateComponent} from './components/alternate/alternate.component'
import {LogGuardService} from './services/log-guard.service'
import {PcrFormComponent} from './components/pcr-form/pcr-form.component'
import {PcrListComponent} from './components/pcr-list/pcr-list.component'
import {DynamicDialogModule} from 'primeng/dynamicdialog'
import {TechniciansComponent} from './components/pcr-form/technicians/technicians.component'
import {OutcomeComponent} from './components/pcr-form/outcome/outcome.component'
import {ShiftComplaintComponent} from './components/pcr-form/shift-complaint/shift-complaint.component'
import {CheckFormComponent} from './components/pcr-form/check-form/check-form.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'patient/:patient',
    component: MainComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: AlternateComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LogGuardService]
      },
      {
        path: 'create',
        component: CreateAccountComponent,
        canActivate: [LogGuardService]
      }
    ]
  }
]

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
    FormControlComponent,
    SaveControllerComponent,
    LoginComponent,
    MainComponent,
    CreateAccountComponent,
    ProfilePreviewComponent,
    ProfileComponent,
    AlternateComponent,
    PcrFormComponent,
    PcrListComponent,
    TechniciansComponent,
    OutcomeComponent,
    ShiftComplaintComponent,
    CheckFormComponent
  ],
  imports: [
    BrowserModule,
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
    ], {developmentMode: !environment.production}),
    EditorModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    PasswordModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)],
    InputTextModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    DynamicDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthGuardService,
    LogGuardService,
    AuthService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    CookieService,
    DialogService
  ],
  entryComponents: [
    PcrFormComponent
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
