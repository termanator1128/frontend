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

  editDetails(patient: Patient) {
    this.updatePatient.emit(patient)
  }

  deletePatient(patient) {
    this.removePatient.emit(patient)
  }

}
