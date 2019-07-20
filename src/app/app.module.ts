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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateAccountComponent},
  {
    path: '**',
    component: MainComponent,
    canActivate: [AuthGuardService]
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
    DropdownModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthGuardService,
    AuthService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    CookieService,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
