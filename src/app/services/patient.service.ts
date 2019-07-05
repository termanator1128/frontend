import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Patient} from '../models/Patient'
import {Observable} from 'rxjs'
import {Response} from '../models/Response'

export const baseUrl = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  /* Patient */
  getPatients(): Observable<{ data: Patient[] }> {
    return this.http.get<{ data: Patient[] }>(`${baseUrl}/patients`)
  }

  postPatient(patient: Patient): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/patients/`, patient)
  }

  getPatient(patientID: string): Observable<Response> {
    return this.http.get<Response>(`${baseUrl}/patients/${patientID}`)
  }

  deletePatient(patientID: string): Observable<Response> {
    return this.http.delete<Response>(`${baseUrl}/patients/${patientID}`)
  }

  putPatient(patientID: string, patient: Patient): Observable<Response> {
    return this.http.put<Response>(`${baseUrl}/patients/${patientID}`, patient)
  }
}
