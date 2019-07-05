import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Rx} from '../models/Rx'
import {baseUrl} from './patient.service'
import {Response} from '../models/Response'

@Injectable({
  providedIn: 'root'
})
export class RxService {

  constructor(private http: HttpClient) {
  }

  postRx(patientID: string, rx: Rx): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/patients/${patientID}/scripts/`, rx)
  }

  deleteRx(patientID: string, scriptID: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patients/${patientID}/scripts/${scriptID}/`)
  }

  putRx(patientID: string, scriptID: string, rx: Rx): Observable<Response> {
    return this.http.put<Response>(`${baseUrl}/patients/${patientID}/scripts/${scriptID}/`, rx)
  }
}
