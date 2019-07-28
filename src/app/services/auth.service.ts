import {Injectable} from '@angular/core'
import {JwtHelperService} from '@auth0/angular-jwt'
import {CookieService} from 'ngx-cookie-service'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Router} from '@angular/router'
import {Store} from '@ngxs/store'
import {SetLoggedInUser} from '../state/actions/state.action'

const authUrl = 'https://auth.aleinin.com'
// TODO
const clientID = 'aleinin'
const clientSecret = 'WinnerPOV'

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,
              private cookie: CookieService,
              private http: HttpClient,
              public router: Router,
              private store: Store) {
  }

  public isAuthenticated(): boolean {
    const token = this.cookie.get('token')
    console.log(token)
    const expired = this.jwtHelper.isTokenExpired(token)
    console.log(expired)
    if (expired) {
      this.deleteToken()
      return false
    } else {
      const username = this.jwtHelper.decodeToken(token).username
      this.store.dispatch(new SetLoggedInUser(username))
      return !expired
    }
  }

  public authenticate(username: string, password: string): Observable<any> {
    console.log('umm')
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers = headers.append('Authorization', 'Basic ' + btoa(`${clientID}:${clientSecret}`))
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
    return this.http.post(`${authUrl}/token`, body.toString(), {
      headers
    })
  }

  public saveToken(token: string) {
    console.log('saving a cookie?')
    this.cookie.set('token', token, undefined, '/')
    this.router.navigate([''])
  }

  public deleteToken(): void {
    this.cookie.delete('token', '/', '/')
  }

  public createNewAccount(username: string, password: string, access: string): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers = headers.append('Authorization', 'Basic ' + btoa(`${clientID}:${clientSecret}`))
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('accessCode', access)
    return this.http.post(`${authUrl}/user`, body.toString(), {
      headers
    })
  }
}
