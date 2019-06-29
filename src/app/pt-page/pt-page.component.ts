import {Component, OnInit} from '@angular/core'
import {PatientSummary} from '../models/patientsummary'

@Component({
  selector: 'app-pt-page',
  templateUrl: './pt-page.component.html',
  styleUrls: ['./pt-page.component.scss']
})
export class PtPageComponent implements OnInit {
  patient: PatientSummary

  constructor() {
    this.patient = {
      name: 'Sophie Richmond',
      age: 21,
      sex: 'Female',
      pronouns: 'Feminine',
      dob: new Date('February 11, 1997'),
      address: '2 Freedom Way',
      pictureSrc: '../../../assets/noimg.jpg'
    }
  }

  ngOnInit() {
  }

}
