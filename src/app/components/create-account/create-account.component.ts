import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {MessageService} from 'primeng/api'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [MessageService]
})
export class CreateAccountComponent implements OnInit {
  form: FormGroup

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      verify: new FormControl('', Validators.required),
      access: new FormControl('', Validators.required),
    })
  }

  submit() {
    const username = this.form.get('username').value
    const password = this.form.get('password').value
    const verify = this.form.get('verify').value
    const access = this.form.get('access').value
    const validPasswords = this.checkPasswords(password, verify)
    if (username && access && validPasswords) {
      this.createAccount(username, password, access)
    }
  }

  checkPasswords(password: string, verify: string): boolean {
    if (password !== verify) {
      this.messageService.add({key: 'tc', severity: 'error', summary: 'Account Creation Failed', detail: 'Passwords must match'})
      this.form.controls.password.reset()
      this.form.controls.verify.reset()
      return false
    }
    return true
  }

  createAccount(username: string, password: string, code: string) {
    const $auth = this.auth.createNewAccount(username, password, code)
    $auth.subscribe(
      resp => {
        this.handleResp(resp)
        if (resp.success) {
          this.createToast('success', 'Success', 'Account created. Redirecting...')
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 3000)
        } else {
          this.failedCreate(resp)
        }
      },
      error => (
        this.failedCreate(error)
      )
    )
  }

  handleResp(resp) {
    console.log(resp.error)
  }

  createToast(severity: string, summary: string, detail: string) {
    this.messageService.add({key: 'tc', severity, summary, detail, life: 6000})
  }

  failedCreate(errorResponse: HttpErrorResponse) {
    const error = errorResponse.error.status
    switch (error) {
      case 'BAD_CODE': {
        console.error(error)
        this.createToast('error', 'Invalid Access Code', 'You must get a new access code')
        this.form.controls.access.reset()
        break
      }
      case 'EXPIRED_CODE': {
        console.error(error)
        this.createToast('error', 'Expired Access Code', 'You must get a new access code')
        this.form.controls.access.reset()
        break
      }
      case 'USER_EXISTS': {
        console.error(error)
        this.createToast('error', 'Duplicate User', 'That username is already in use')
        this.form.controls.username.reset()
        break
      }
      case 'FAILED_USER_SAVE': {
        console.error(error)
        this.createToast('error', 'Something broke', 'Internal Error (Bad Save)')
        this.form.reset()
        break
      }
      case 'BAD_CREATE_REQUEST': {
        console.error(error)
        this.createToast('error', 'Something broke', 'Internal Error (Bad Form Data)')
        this.form.reset()
        break
      }
      default: {
        console.error(errorResponse)
        console.error(errorResponse.error)
        this.createToast('error', 'Something broke', 'Unspecified Internal Error')
        this.form.reset()
      }
    }
  }

}
