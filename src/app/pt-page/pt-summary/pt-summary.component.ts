import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core'
import {PatientSummary} from '../../models/patientsummary'
import {FormBuilder, FormGroup} from '@angular/forms'
import {Patient} from '../../models/Patient'

@Component({
  selector: 'app-pt-summary',
  templateUrl: './pt-summary.component.html',
  styleUrls: ['./pt-summary.component.scss']
})
export class PtSummaryComponent implements OnChanges {
  @Input() name: string
  @Input() details: PatientSummary
  @Input() columns
  @Output() editDetails: EventEmitter<PatientSummary> = new EventEmitter()
  @Output() deletePatient: EventEmitter<Patient> = new EventEmitter()
  display = false
  form: FormGroup
  patientDetailsAndName

  constructor(private formBuilder: FormBuilder) {
  }

  show() {
    this.display = true
  }

  hide() {
    this.display = false
  }

  edit(patientDetailsAndName) {
    this.editDetails.emit(patientDetailsAndName)
    this.hide()
  }

  delete(patientDetailsAndName) {
    this.deletePatient.emit(patientDetailsAndName)
    this.hide()
  }

  ngOnChanges() {
    this.patientDetailsAndName = {
      name: this.name,
      sex: this.details.sex,
      pronouns: this.details.pronouns,
      dob: this.details.dob,
      address: this.details.address,
      age: this.details.age
    }
  }

}
