import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store'
import {AddRx, RemoveRx, UpdateRx} from './actions/rx.action'
import {AddPatient, GetPatients, RemovePatient, UpdatePatient} from './actions/patient.action'
import {Patient} from '../models/Patient'
import {SetSelectedPatient, SetState} from './actions/state.action'
import {Rx} from '../models/Rx'
import {PatientService} from '../services/patient.service'

const columns = {
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


export class PortalStateModel {
  patients: Patient[]
  columns: {}
  state: 'landing' | 'new' | 'patient'
  selectedPatient: Patient
  scripts: Rx[]
}

@State<PortalStateModel>({
  name: 'patients',
  defaults: {
    patients: [],
    columns,
    state: 'landing',
    selectedPatient: undefined,
    scripts: []
  }
})

export class PortalState implements NgxsOnInit {
  constructor(private patientService: PatientService) {
  }

  @Selector()
  static getPatients(state: PortalStateModel) {
    return state.patients
  }

  @Selector()
  static getColumns(state: PortalStateModel) {
    return state.columns
  }

  @Selector()
  static getState(state: PortalStateModel) {
    return state.state
  }

  @Selector()
  static getSelectedPatient(state: PortalStateModel) {
    return state.selectedPatient
  }

  ngxsOnInit(ctx: StateContext<PortalStateModel>) {
    return ctx.dispatch(new GetPatients())
  }

  @Action(GetPatients)
  getPatients(ctx: StateContext<PortalStateModel>, {}: SetState) {
    this.patientService.getPatients().subscribe(resp => {
      ctx.patchState({
        patients: resp.data
      })
    })
  }


  @Action(SetState)
  setState(ctx: StateContext<PortalStateModel>, {payload}: SetState) {
    ctx.patchState({
      state: payload,
      selectedPatient: undefined
    })
  }

  /* Patient */
  @Action(AddPatient)
  addPatient(ctx: StateContext<PortalStateModel>, {payload}: AddPatient) {
    const state = ctx.getState()
    this.patientService.postPatient(payload).subscribe(resp => {
      const patient: Patient = resp.data
      ctx.patchState({
        patients: [...state.patients, patient],
        state: 'patient',
        selectedPatient: patient
      })
    })
  }

  @Action(RemovePatient)
  removePatient(ctx: StateContext<PortalStateModel>, {payload}: RemovePatient) {
    this.patientService.deletePatient(payload.id).subscribe()
    ctx.patchState({
      patients: ctx.getState().patients.filter(a => a.id !== payload.id),
      state: 'landing',
      selectedPatient: undefined
    })
  }

  @Action(UpdatePatient)
  updatePatient(ctx: StateContext<PortalStateModel>, {payload}: UpdatePatient) {
    const patients = ctx.getState().patients
    const index = patients.findIndex(patient => {
      return patient.id === payload.id
    })
    patients[index] = payload
    ctx.patchState({
      patients,
      selectedPatient: payload
    })
  }

  /* Rx */
  @Action(AddRx)
  addRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: AddRx) {
    const state = ctx.getState()
    // DB Stuff
    // TODO get id from DB
    // payload.id = Math.floor(Math.random() * Math.floor(100000))
    // Cleanup Stuff
    ctx.patchState({
      scripts: [...state.scripts, payload]
    })
  }

  @Action(RemoveRx)
  removeRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: RemoveRx) {
    const state = ctx.getState()
    // DB Stuff
    // Cleanup Stuff
    const patients = state.patients
    patients.filter(patient => {
      return patient.id !== patientID
    })
    ctx.patchState({
      patients
    })
  }

  @Action(UpdateRx)
  updateRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateRx) {
    console.log(payload)
    console.log(patientID)
    const state = ctx.getState()
    // DB Stuff
    // Cleanup Stuff
    const patients = JSON.parse(JSON.stringify(state.patients))
    const patientIndex = patients.findIndex(patient => {
      return patient.id === patientID
    })
    if (patientIndex !== undefined) {
      const scriptIndex = patients[patientIndex].scripts.findIndex(script => {
        return script.id === payload.id
      })
      if (scriptIndex !== undefined) {
        patients[patientIndex].scripts[scriptIndex] = payload
      } else {
        throw new Error('not a valid RxID')
      }
    } else {
      throw new Error('not a valid patientID')
    }
    console.log(patients)
    ctx.patchState({
      patients
    })
  }

  /* History */

  /* Allergy */

  @Action(SetSelectedPatient)
  setSelectedPatient(ctx: StateContext<PortalStateModel>, {payload}: SetSelectedPatient) {
    ctx.patchState({
      state: 'patient',
      selectedPatient: payload
    })
  }
}

