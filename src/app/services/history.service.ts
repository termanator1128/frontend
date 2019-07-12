import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from './patient.service'
import {MedicalHistory} from '../models/MedicalHistory'
import {Response} from '../models/Response'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  postHistory(patientID: string, medHist: MedicalHistory): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/patients/${patientID}/history/`, medHist)
  }

  deleteHistory(patientID: string, historyID: string): Observable<Response> {
    return this.http.delete<Response>(`${baseUrl}/patients/${patientID}/history/${historyID}/`)
  }

  putHistory(patientID: string, historyID: string, medHist: MedicalHistory): Observable<Response> {
    return this.http.put<Response>(`${baseUrl}/patients/${patientID}/history/${historyID}/`, medHist)
  }
}
