import {Component} from '@angular/core'
import {Patient} from './models/Patient'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedPatient
  patients: Patient[] = [
    {
      name: 'Sophie Richmond',
      scripts: [
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Vicodin',
          dosage: '500mg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Fentanyl',
          dosage: '100mcg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Amoxicilyn',
          dosage: '500mg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
      ],
      history: [
        {
          date: new Date('Tue Dec 31, 2019'),
          diagnosis: 'Concussion',
          diagnoser: 'Liam Salazar, M.D.'
        }
      ],
      allergies: [
        {
          allergy: 'Penicilin',
          reaction: 'hives',
          severity: 'Moderate'
        }
      ],
      details: {
        age: 21,
        sex: 'Female',
        pronouns: 'Feminine',
        dob: new Date('February 11, 1997'),
        address: '2 Freedom Way',
        pictureSrc: '../../../assets/noimg.jpg'
      }
    },
    {
      name: 'Josh Parker',
      scripts: [
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Vicodin',
          dosage: '500mg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Fentanyl',
          dosage: '100mcg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
        {
          date: new Date('Tue Dec 31, 2019'),
          drug: 'Amoxicilyn',
          dosage: '500mg',
          reason: 'because',
          prescriber: 'Liam Salazar, M.D.'
        },
      ],
      history: [
        {
          date: new Date('Tue Dec 31, 2019'),
          diagnosis: 'Concussion',
          diagnoser: 'Liam Salazar, M.D.'
        }
      ],
      allergies: [
        {
          allergy: 'Penicilin',
          reaction: 'hives',
          severity: 'Moderate'
        }
      ],
      details: {
        age: 30,
        sex: 'Male',
        pronouns: 'Masculine',
        dob: new Date('February 11, 1985'),
        address: '2 Freedom Way',
        pictureSrc: '../../../assets/noimg.jpg'
      }
    }
  ]
  columns = {
    rx: [
      {field: 'date', header: 'Prescribed on'},
      {field: 'drug', header: 'Drug'},
      {field: 'dosage', header: 'Dosage'},
      {field: 'reason', header: 'Reason for taking'},
      {field: 'prescriber', header: 'Prescribed by'}
    ],
    history: [
      {field: 'date', header: 'Onset'},
      {field: 'diagnosis', header: 'Diagnosis'},
      {field: 'diagnoser', header: 'Diagnosed by'}
    ],
    allergy: [
      {field: 'allergy', header: 'Allergy'},
      {field: 'reaction', header: 'Reaction'},
      {field: 'severity', header: 'Severity'}
    ],
    details: [
      {field: 'name', header: 'Name'},
      {field: 'age', header: 'Age'},
      {field: 'sex', header: 'Sex'},
      {field: 'pronouns', header: 'Pronouns'},
      {field: 'dob', header: 'DOB'},
      {field: 'address', header: 'Address'},
    ]
  }

  /*
  patients = [
    {
      name: 'Sophie Richmond'
    },
    {
      name: 'Josh Parker'
    },
    {
      name: 'Liam Salazar'
    },
    {
      name: 'Cass Crowley'
    },
    {
      name: 'Ryan Holt'
    },
    {
      name: 'Sam Grimms'
    },
    {
      name: 'Eddy Haymes'
    },
    {
      name: 'Charlie Mercer'
    },
    {
      name: 'BJ Smith'
    }
  ]
  */

  patientSelect(patient) {
    this.selectedPatient = patient
    console.log(this.selectedPatient)
  }
}
