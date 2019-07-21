import {Component, OnInit} from '@angular/core'
import {PortalState} from '../../state/portal.state'
import {AddPatient, GetPatients} from '../../state/actions/patient.action'
import {Select, Store} from '@ngxs/store'
import {Patient} from '../../models/Patient'
import {SetSelectedPatient, SetState} from '../../state/actions/state.action'
import {combineLatest, Observable} from 'rxjs'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Select(PortalState.getSelectedPatient) selectedPatient$: Observable<Patient>
  @Select(PortalState.getPatients) patients$: Observable<Array<Patient>>
  @Select(PortalState.getState) state$: Observable<'landing' | 'patient' | 'new'>
  @Select(PortalState.getColumns) columns$: Observable<any>
  state: 'landing' | 'patient' | 'new'

  constructor(private store: Store,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  static hasID(patient: Patient, id: string) {
    return patient._id === id
  }
  ngOnInit(): void {
    this.state$.subscribe(state => {
      console.log(state)
      this.state = state
    })
    this.store.dispatch(new GetPatients())
    this.patients$.subscribe()
    combineLatest([this.patients$, this.activatedRoute.params]).subscribe(
      ([patients, params]: any) => {
        const patientID = params.patient
        if (patients !== undefined && patientID) {
          const selectedPatient = patients.find(patient => MainComponent.hasID(patient, patientID))
          if (selectedPatient) {
            this.store.dispatch(new SetSelectedPatient(selectedPatient))
          } else {
            this.router.navigate([''])
          }
        }
      }
    )
  }

  setNewPatientState() {
    this.store.dispatch(new SetState('new'))
  }

  saveNewPatient(patient: Patient) {
    this.store.dispatch(new AddPatient(patient))
    this.hide()
  }

  hide() {
    this.router.navigate([''])
    this.store.dispatch(new SetState('landing'))
  }

}


