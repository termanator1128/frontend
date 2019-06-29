import {Component, Input, OnInit} from '@angular/core'
import {PatientSummary} from '../../models/patientsummary'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-pt-summary',
  templateUrl: './pt-summary.component.html',
  styleUrls: ['./pt-summary.component.scss']
})
export class PtSummaryComponent implements OnInit {
  @Input() patient: PatientSummary
  display = false
  form: FormGroup

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

  save() {
    console.log(this.form)
  }

  delete() {
    console.log(this.form)
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.patient.name,
      sex: this.patient.sex,
      pronouns: this.patient.pronouns,
      dob: this.patient.dob,
      address: this.patient.address,
      age: this.patient.age
    })
  }

}
