import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {CookieService} from 'ngx-cookie-service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private cookie: CookieService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.cookie.get('token')
    if (token && request.url.includes('/api/')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(request)
  }
}
