import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store'
import {AddRx, RemoveRx, UpdateRx} from './actions/rx.action'
import {AddPatient, GetPatients, RemovePatient, UpdatePatient} from './actions/patient.action'
import {Patient} from '../models/Patient'
import {SetSelectedPatient, SetState} from './actions/state.action'
import {Rx} from '../models/Rx'
import {PatientService} from '../services/patient.service'
import {PatientColumns} from '../models/Column'

const columns: PatientColumns = {
  rx: [
    {controlName: 'date', type: 'date', label: 'Prescribed on', required: true},
    {controlName: 'drug', type: 'text', label: 'Drug', required: true},
    {controlName: 'dosage', type: 'text', label: 'Dosage', required: true},
    {controlName: 'reason', type: 'text', label: 'Reason for taking', required: true},
    {controlName: 'prescriber', type: 'text', label: 'Prescribed by', required: true}
  ],
  history: [
    {controlName: 'date', type: 'date', label: 'Onset', required: true},
    {controlName: 'diagnosis', type: 'text', label: 'Diagnosis', required: true},
    {controlName: 'diagnoser', type: 'text', label: 'Diagnosed by', required: true}
  ],
  allergy: [
    {controlName: 'allergy', type: 'text', label: 'Allergy', required: true},
    {controlName: 'reaction', type: 'text', label: 'Reaction', required: true},
    {controlName: 'severity', type: 'text', label: 'Severity', required: true}
  ],
  details: [
    {controlName: 'name', type: 'text', label: 'Name', required: true},
    {controlName: 'age', type: 'number', label: 'Age', required: true},
    {controlName: 'sex', type: 'sex', label: 'Sex', required: true},
    {controlName: 'pronouns', type: 'text', label: 'Pronouns', required: false},
    {controlName: 'dob', type: 'date', label: 'DOB', required: true},
    {controlName: 'address', type: 'text', label: 'Address', required: false}
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
    console.log('made it')
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
    this.patientService.deletePatient(payload._id).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          patients: ctx.getState().patients.filter(a => a._id !== payload._id),
          state: 'landing',
          selectedPatient: undefined
        })
      } else {
        throw new Error('Unable to delete')
      }
    })
  }

  @Action(UpdatePatient)
  updatePatient(ctx: StateContext<PortalStateModel>, {payload}: UpdatePatient) {
    this.patientService.putPatient(payload._id, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to update')
      }
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
      return patient._id !== patientID
    })
    ctx.patchState({
      patients
    })
  }

  @Action(UpdateRx)
  updateRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateRx) {
    const state = ctx.getState()
    // DB Stuff
    // Cleanup Stuff
    const patients = JSON.parse(JSON.stringify(state.patients))
    const patientIndex = patients.findIndex(patient => {
      return patient._id === patientID
    })
    if (patientIndex !== undefined) {
      const scriptIndex = patients[patientIndex].scripts.findIndex(script => {
        return script._id === payload._id
      })
      if (scriptIndex !== undefined) {
        patients[patientIndex].scripts[scriptIndex] = payload
      } else {
        throw new Error('not a valid RxID')
      }
    } else {
      throw new Error('not a valid patientID')
    }
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

