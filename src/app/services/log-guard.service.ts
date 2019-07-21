import {Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {AuthService} from './auth.service'

@Injectable()
export class LogGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log('a')
      return true
    }
    console.log('loggedin')
    this.router.navigate([''])
    return false
  }
}
