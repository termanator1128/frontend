import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Patient} from '../models/Patient'
import {Observable} from 'rxjs'
import {baseUrl} from './patient.service'
import {Allergy} from '../models/Allergy'

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient) {
  }

  postAllergy(patientID: string, allergy: Allergy): Observable<{ data: Patient }> {
    return this.http.post<{ data: Patient }>(`${baseUrl}/patients/${patientID}/allergies/`, allergy)
  }

  deleteAllergy(patientID: string, allergyID: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patients/${patientID}/allergies/${allergyID}/`)
  }

  putAllergy(patientID: string, allergyID: string, allergy: Allergy): Observable<{ data: Patient }> {
    return this.http.put<{ data: Patient }>(`${baseUrl}/patients/${patientID}/allergies/${allergyID}/`, allergy)
  }
}
