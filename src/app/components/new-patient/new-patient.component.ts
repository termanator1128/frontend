import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Patient} from '../../models/Patient'

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent {
  @Input() cols
  @Output() addRow: EventEmitter<any> = new EventEmitter()
  @Output() closeDialog: EventEmitter<any> = new EventEmitter()

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
