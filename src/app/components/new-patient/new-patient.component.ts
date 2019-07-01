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

  saveNewPatient(newPtDetailsAndName) {
    const name = newPtDetailsAndName.name
    delete newPtDetailsAndName.name
    const newPatient: Patient = {
      name,
      details: newPtDetailsAndName,
      notes: '',
      scripts: undefined,
      allergies: undefined,
      history: undefined
    }
    this.addRow.emit(newPatient)
  }

  hide() {
    this.closeDialog.emit()
  }

}
