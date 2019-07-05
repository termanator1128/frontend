import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Patient} from '../models/Patient'
import {Observable} from 'rxjs'
import {baseUrl} from './patient.service'
import {MedicalHistory} from '../models/MedicalHistory'

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  postHistory(patientID: string, medHist: MedicalHistory): Observable<{ data: Patient }> {
    return this.http.post<{ data: Patient }>(`${baseUrl}/patients/${patientID}/history/`, medHist)
  }

  deleteHistory(patientID: string, historyID: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patients/${patientID}/history/${historyID}/`)
  }

  putHistory(patientID: string, historyID: string, medHist: MedicalHistory): Observable<{ data: Patient }> {
    return this.http.put<{ data: Patient }>(`${baseUrl}/patients/${patientID}/history/${historyID}/`, medHist)
  }
}
