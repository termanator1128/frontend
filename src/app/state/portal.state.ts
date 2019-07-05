import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store'
import {AddRx, RemoveRx, UpdateRx} from './actions/rx.action'
import {AddPatient, GetPatients, RemovePatient, UpdatePatient} from './actions/patient.action'
import {Patient} from '../models/Patient'
import {SetSelectedPatient, SetState} from './actions/state.action'
import {Rx} from '../models/Rx'
import {PatientService} from '../services/patient.service'
import {PatientColumns} from '../models/Column'
import {RxService} from '../services/rx.service'
import {HistoryService} from '../services/history.service'
import {AllergyService} from '../services/allergy.service'
import {AddHistory, RemoveHistory, UpdateHistory} from './actions/history.action'
import {AddAllergy, RemoveAllergy, UpdateAllergy} from './actions/allergy.action'

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
  constructor(
    private patientService: PatientService,
    private rxService: RxService,
    private historyService: HistoryService,
    private allergyService: AllergyService
  ) {
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

  @Action(SetSelectedPatient)
  setSelectedPatient(ctx: StateContext<PortalStateModel>, {payload}: SetSelectedPatient) {
    ctx.patchState({
      state: 'patient',
      selectedPatient: payload
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
    this.rxService.postRx(patientID, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to add Rx')
      }
    })
  }

  @Action(RemoveRx)
  removeRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: RemoveRx) {
    this.rxService.deleteRx(patientID, payload._id).subscribe(resp => {
      if (resp) {
        console.log(resp)
        if (resp.status === 'success') {
          ctx.patchState({
            selectedPatient: resp.data
          })
          return ctx.dispatch(new GetPatients())
        } else {
          throw new Error(resp.status)
        }
      }
    })
  }

  @Action(UpdateRx)
  updateRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateRx) {
    this.rxService.putRx(patientID, payload._id, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to update RX')
      }
    })
  }

  /* History */

  @Action(AddHistory)
  addHistory(ctx: StateContext<PortalStateModel>, {payload, patientID}: AddHistory) {
    this.historyService.postHistory(patientID, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to add med history')
      }
    })
  }

  @Action(RemoveHistory)
  removeHistory(ctx: StateContext<PortalStateModel>, {payload, patientID}: RemoveHistory) {
    this.historyService.deleteHistory(patientID, payload._id).subscribe(resp => {
      if (resp) {
        if (resp.status === 'success') {
          ctx.patchState({
            selectedPatient: resp.data
          })
          return ctx.dispatch(new GetPatients())
        } else {
          throw new Error('unable to remove med history')
        }
      }
    })
  }

  @Action(UpdateHistory)
  updateHistory(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateHistory) {
    this.historyService.putHistory(patientID, payload._id, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to update med history')
      }
    })
  }

  /* Allergy */

  @Action(AddAllergy)
  addAllergy(ctx: StateContext<PortalStateModel>, {payload, patientID}: AddAllergy) {
    this.allergyService.postAllergy(patientID, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to add Allergy')
      }
    })
  }

  @Action(RemoveAllergy)
  removeAllergy(ctx: StateContext<PortalStateModel>, {payload, patientID}: RemoveAllergy) {
    this.allergyService.deleteAllergy(patientID, payload._id).subscribe(resp => {
      if (resp) {
        if (resp.status === 'success') {
          ctx.patchState({
            selectedPatient: resp.data
          })
          return ctx.dispatch(new GetPatients())
        } else {
          throw new Error('unable to remove Allergy')
        }
      }
    })
  }

  @Action(UpdateAllergy)
  updateAllergy(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateAllergy) {
    this.allergyService.putAllergy(patientID, payload._id, payload).subscribe(resp => {
      if (resp.status === 'success') {
        ctx.patchState({
          selectedPatient: resp.data
        })
        return ctx.dispatch(new GetPatients())
      } else {
        throw new Error('Unable to update Allergy')
      }
    })
  }
}

