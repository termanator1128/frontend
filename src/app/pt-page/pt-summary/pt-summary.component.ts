import {Component, Input, OnInit} from '@angular/core'
import {PatientSummary} from '../../models/patientsummary'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-pt-summary',
  templateUrl: './pt-summary.component.html',
  styleUrls: ['./pt-summary.component.scss']
})
export class PtSummaryComponent implements OnInit {
  @Input() name: string
  @Input() details: PatientSummary
  @Input() columns
  display = false
  form: FormGroup
  patient

  constructor(private formBuilder: FormBuilder) {
  }

  formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ]
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return monthNames[monthIndex] + ' ' + day + ', ' + year
  }

  show() {
    this.display = true
  }

  hide() {
    this.display = false
  }

  edit(patient) {
    console.log(patient)
    this.hide()
  }

  delete(patient) {
    console.log(patient)
    this.hide()
  }

  ngOnInit() {
    this.patient = {
      name: this.name,
      sex: this.details.sex,
      pronouns: this.details.pronouns,
      dob: this.details.dob,
      address: this.details.address,
      age: this.details.age
    }
  }

}
