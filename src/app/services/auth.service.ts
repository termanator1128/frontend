import {Injectable} from '@angular/core'
import {JwtHelperService} from '@auth0/angular-jwt'
import {CookieService} from 'ngx-cookie-service'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Router} from '@angular/router'

const authUrl = 'https://auth.aleinin.com'

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,
              private cookie: CookieService,
              private http: HttpClient,
              public router: Router) {
  }

  public isAuthenticated(): boolean {
    const token = this.cookie.get('token')
    const expired = this.jwtHelper.isTokenExpired(token)
    if (expired) {
      this.deleteToken()
    }
    return !expired
  }

  public authenticate(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
    return this.http.post(`${authUrl}/token`, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  public saveToken(token: string) {
    this.cookie.set('token', token)
    this.router.navigate([''])
  }

  public deleteToken(): void {
    this.cookie.delete('token')
    this.router.navigate(['login'])
  }
}
