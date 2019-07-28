import {Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {AuthService} from './auth.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log('auth not logged in, moving to login')
      this.router.navigate(['profile/login'])
      return false
    }
    console.log('auth logged in, allowing access')
    return true
  }
}
