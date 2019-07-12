import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Patient} from '../../models/Patient'
import {Select} from '@ngxs/store'
import {PortalState} from '../../state/portal.state'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent {
  @Input() cols
  @Output() addRow: EventEmitter<any> = new EventEmitter()
  @Output() closeDialog: EventEmitter<any> = new EventEmitter()
  @Select(PortalState.getPatientNames) patientNames$: Observable<Array<string>>

  constructor() {
  }

  saveNewPatient(patientInfo) {
    const newPatient: Patient = {
      _id: undefined,
      info: patientInfo,
      notes: '',
      scripts: [],
      allergies: [],
      history: []
    }
    this.addRow.emit(newPatient)
  }

  hide() {
    this.closeDialog.emit()
  }

}
