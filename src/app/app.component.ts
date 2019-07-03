import {Component} from '@angular/core'
import {Patient} from './models/Patient'
import {Observable} from 'rxjs'
import {PortalState} from './state/portal.state'
import {Select, Store} from '@ngxs/store'
import {AddPatient, RemovePatient, SetSelectedPatient, SetState, UpdatePatient} from './state/portal.action'

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


  setNewPatientState() {
    this.store.dispatch(new SetState('new'))
  }

  patientSelect(patient: Patient) {
    this.store.dispatch(new SetSelectedPatient(patient))
  }

  saveNewPatient(patient: Patient) {
    this.store.dispatch(new AddPatient(patient))
    this.hide()
  }

  updateExistingPatient(patient: Patient) {
    this.store.dispatch(new UpdatePatient(patient))
  }

  deletePatient(patient: Patient) {
    this.store.dispatch(new RemovePatient(patient))
  }

  hide() {
    this.store.dispatch(new SetState('landing'))
  }
}
