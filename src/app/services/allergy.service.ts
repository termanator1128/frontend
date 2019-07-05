import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {baseUrl} from './patient.service'
import {Allergy} from '../models/Allergy'
import {Response} from '../models/Response'

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(private http: HttpClient) {
  }

  postAllergy(patientID: string, allergy: Allergy): Observable<Response> {
    return this.http.post<Response>(`${baseUrl}/patients/${patientID}/allergies/`, allergy)
  }

  deleteAllergy(patientID: string, allergyID: string): Observable<any> {
    return this.http.delete(`${baseUrl}/patients/${patientID}/allergies/${allergyID}/`)
  }

  putAllergy(patientID: string, allergyID: string, allergy: Allergy): Observable<Response> {
    return this.http.put<Response>(`${baseUrl}/patients/${patientID}/allergies/${allergyID}/`, allergy)
  }
}
