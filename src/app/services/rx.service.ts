import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Patient} from '../models/Patient'
import {Observable} from 'rxjs'
import {Rx} from '../models/Rx'
import {baseUrl} from './patient.service'

@Injectable({
  providedIn: 'root'
})
export class RxService {

  constructor(private http: HttpClient) {
  }

  postRx(patientID: string, rx: Rx): Observable<{ data: Patient }> {
    return this.http.post<{ data: Patient }>(`${baseUrl}/patients/${patientID}/scripts/`, rx)
  }

  deleteRx(patientID: string, scriptID: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patients/${patientID}/scripts/${scriptID}/`)
  }

  putRx(patientID: string, scriptID: string, rx: Rx): Observable<{ data: Patient }> {
    return this.http.put<{ data: Patient }>(`${baseUrl}/patients/${patientID}/scripts/${scriptID}/`, rx)
  }
}
