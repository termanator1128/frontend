import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {Patient} from '../../models/Patient'

@Component({
  selector: 'app-pt-summary',
  templateUrl: './pt-summary.component.html',
  styleUrls: ['./pt-summary.component.scss']
})
export class PtSummaryComponent implements OnChanges {
  @Input() patient: Patient
  @Input() columns
  @Output() editDetails: EventEmitter<Patient> = new EventEmitter()
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
    const patient: Patient = JSON.parse(JSON.stringify(this.patient))
    patient.name = patientDetailsAndName.name
    delete patientDetailsAndName.name
    patient.details = patientDetailsAndName
    this.editDetails.emit(patient)
    this.hide()
  }

  delete(patientDetailsAndName) {
    this.deletePatient.emit(this.patient)
    this.hide()
  }

  ngOnChanges() {
    console.log(this.patient)
    this.patientDetailsAndName = {
      name: this.patient.name,
      sex: this.patient.details.sex,
      pronouns: this.patient.details.pronouns,
      dob: this.patient.details.dob,
      address: this.patient.details.address,
      age: this.patient.details.age
    }
  }

}
