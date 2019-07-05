import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Patient} from '../models/Patient'
import {Observable} from 'rxjs'

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

  postPatient(patient: Patient): Observable<{ data: Patient }> {
    return this.http.post<{ data: Patient }>(`${baseUrl}/patients/`, patient)
  }

  getPatient(id: string): Observable<{ data: Patient }> {
    return this.http.get<{ data: Patient }>(`${baseUrl}/patients/${id}`)
  }

  deletePatient(id: string): Observable<{ data: Patient }> {
    return this.http.delete<{ data: Patient }>(`${baseUrl}/patients/${id}`)
  }

  putPatient(patient: Patient, id: string): Observable<{ data: Patient }> {
    return this.http.put<{ data: Patient }>(`${baseUrl}/patients/${id}`, patient)
  }
}
