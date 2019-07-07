import {Component} from '@angular/core'
import {PortalState} from '../../state/portal.state'
import {AddPatient} from '../../state/actions/patient.action'
import {Select, Store} from '@ngxs/store'
import {Patient} from '../../models/Patient'
import {SetSelectedPatient, SetState} from '../../state/actions/state.action'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

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

  hide() {
    this.store.dispatch(new SetState('landing'))
  }

}


