import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core'
import {PatientInfo} from '../../models/PatientInfo'

@Component({
  selector: 'app-pt-summary',
  templateUrl: './pt-summary.component.html',
  styleUrls: ['./pt-summary.component.scss']
})
export class PtSummaryComponent implements OnChanges {
  @Input() info: PatientInfo
  @Input() columns
  @Output() editDetails: EventEmitter<PatientInfo> = new EventEmitter()
  @Output() deletePatient: EventEmitter<any> = new EventEmitter()
  display = false

  constructor() {
  }

  show() {
    this.display = true
  }

  hide() {
    this.display = false
  }

  edit(patientInfo) {
    this.editDetails.emit(patientInfo)
    this.hide()
  }

  delete() {
    this.deletePatient.emit()
    this.hide()
  }

  ngOnChanges() {
  }

}
