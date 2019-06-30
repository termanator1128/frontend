import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Patient} from '../models/Patient'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {
  @Input() patients: Patient[]
  input: any
  filteredPatients: any[]
  @Output() selectPatient: EventEmitter<any> = new EventEmitter()

  constructor() {
  }

  filterPatientSingle(event) {
    const query = event.query
    this.filteredPatients = this.filterPatient(query, this.patients)
  }

  filterPatient(query, patients: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = []
    for (let i = 0; i < patients.length; i++) {
      const patient = patients[i]
      if (patient.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(patient)
      }
    }
    if (filtered.length === 1) {
      this.selectPatient.emit(filtered[0])
    }
    return filtered
  }

  checkSelection() {
    this.selectPatient.emit(this.input)
  }

  ngOnInit() {
  }

}
