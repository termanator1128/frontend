import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../services/auth.service'
import {MessageService} from 'primeng/api'
import {Store} from '@ngxs/store'
import {SetLoggedInUser} from '../../state/actions/state.action'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private messageService: MessageService,
              private store: Store) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  submit() {
    const $auth = this.auth.authenticate(this.form.controls.username.value, this.form.controls.password.value)
    $auth.subscribe(
      resp => (
        this.checkAuth(resp)
      ),
      error => (
        this.failedAuth(error)
      )
    )
  }

  failedAuth(error) {
    console.error(error)
    this.messageService.add({key: 'tc', severity: 'error', summary: 'Login Failed', detail: 'Username and/or password incorrect'})
    this.form.controls.password.reset()
  }

  checkAuth(resp) {
    if (resp.token) {
      this.auth.saveToken(resp.token)
      this.store.dispatch(new SetLoggedInUser(this.form.controls.username.value))
    } else {
      this.failedAuth(resp)
    }
  }
}
