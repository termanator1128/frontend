import {Component, Input} from '@angular/core'
import {Patient} from '../../models/Patient'
import {PatientInfo} from '../../models/PatientInfo'
import {Store} from '@ngxs/store'
import {RemovePatient, UpdatePatient} from '../../state/actions/patient.action'

@Component({
  selector: 'app-pt-page',
  templateUrl: './pt-page.component.html',
  styleUrls: ['./pt-page.component.scss']
})
export class PtPageComponent {
  @Input() patient: Patient
  @Input() columns

  constructor(private store: Store) {
  }

  editDetails(patientInfo: PatientInfo) {
    const patientCopy = JSON.parse(JSON.stringify(this.patient))
    patientCopy.info = patientInfo
    this.store.dispatch(new UpdatePatient(patientCopy))
  }

  deletePatient() {
    this.store.dispatch(new RemovePatient(this.patient))
  }

}
