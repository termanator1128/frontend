import {Component} from '@angular/core'
import {Patient} from './models/Patient'
import {Observable} from 'rxjs'
import {PortalState} from './state/portal.state'
import {Select, Store} from '@ngxs/store'
import {SetSelectedPatient, SetState} from './state/portal.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(PortalState.getSelectedPatient) selectedPatient$: Observable<Patient>
  @Select(PortalState.getPatients) patients$: Observable<Array<Patient>>
  @Select(PortalState.getState) state$: Observable<'landing' | 'patient' | 'new'>
  @Select(PortalState.getColumns) columns$: Observable<any>

  constructor(private store: Store) {
  }


  newPatient() {
    this.store.dispatch(new SetState('new'))
  }

  patientSelect(patient) {
    this.store.dispatch(new SetSelectedPatient(patient))
  }

  saveNewPatient(patient) {
    console.log(patient)
    this.hide()
  }

  updateExistingPatient(patient) {
    console.log(patient)
    this.hide()
  }

  deletePatient(patient) {
    console.log(patient)
    this.hide()
  }

  hide() {
    this.store.dispatch(new SetState('landing'))
  }
}
