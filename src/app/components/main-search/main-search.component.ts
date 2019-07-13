import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Patient} from '../../models/Patient'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent {
  @Input() patients: Patient[]
  input: any
  filteredPatients: Patient[]
  @Output() selectPatient: EventEmitter<any> = new EventEmitter()
  @Output() createNew: EventEmitter<any> = new EventEmitter()

  constructor() {
  }

  filterPatientSingle(event) {
    const query = event.query
    this.filteredPatients = this.filterPatient(query, this.patients)
  }

  filterPatient(query, patients: Patient[]): Patient[] {
    const filtered: any[] = []
    for (const patient of patients) {
      if (patient.info.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(patient)
      }
    }
    if (filtered.length === 1 && filtered[0].info.name === this.input) {
      this.selectPatient.emit(filtered[0])
      this.input = ''
    }
    return filtered
  }

  checkSelection() {
    this.selectPatient.emit(this.input)
    this.input = ''
  }

  newPatient() {
    this.input = ''
    this.createNew.emit()
  }
}
