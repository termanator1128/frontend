import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Patient} from '../models/Patient'

@Component({
  selector: 'app-pt-page',
  templateUrl: './pt-page.component.html',
  styleUrls: ['./pt-page.component.scss']
})
export class PtPageComponent implements OnInit {
  @Input() patient: Patient
  @Input() columns
  @Output() updatePatient: EventEmitter<Patient> = new EventEmitter()
  @Output() addPatient: EventEmitter<Patient> = new EventEmitter()
  @Output() removePatient: EventEmitter<Patient> = new EventEmitter()
  constructor() {
  }

  ngOnInit() {
  }

  editDetails(detailsAndName) {
    if (this.patient.name === detailsAndName.name) {
      delete detailsAndName.name
      this.patient.details = detailsAndName
      this.updatePatient.emit(this.patient)
    } else {
      const newPatient: Patient = JSON.parse(JSON.stringify(this.patient))
      newPatient.name = detailsAndName.name
      delete detailsAndName.name
      newPatient.details = detailsAndName
      this.deletePatient(this.patient)
      this.addPatient.emit(newPatient)
    }
  }

  deletePatient(detailsAndName) {
    delete detailsAndName.name
    this.patient.details = detailsAndName
    this.removePatient.emit(this.patient)
  }

}
