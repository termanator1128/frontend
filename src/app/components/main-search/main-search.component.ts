import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Patient} from '../../models/Patient'
import {Router} from '@angular/router'

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent {
  @Input() patients: Patient[]
  input: any
  filteredPatients: Patient[]
  @Output() createNew: EventEmitter<any> = new EventEmitter()

  constructor(private router: Router) {
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
      this.router.navigate([`patient/${filtered[0]._id}`])
      this.input = ''
    }
    return filtered
  }

  checkSelection() {
    this.router.navigate([`patient/${this.input._id}`])
    this.input = ''
  }

  newPatient() {
    this.input = ''
    this.createNew.emit()
  }
}
