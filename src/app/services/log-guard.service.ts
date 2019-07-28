import {Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {AuthService} from './auth.service'

@Injectable()
export class LogGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log('log not logged in, staying')
      return true
    }
    console.log('log logged in, moving away from login/create')
    this.router.navigate([''])
    return false
  }
}
