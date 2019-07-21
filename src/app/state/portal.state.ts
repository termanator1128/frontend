import {Action, Selector, State, StateContext} from '@ngxs/store'
import {AddRx, RemoveRx, UpdateRx} from './actions/rx.action'
import {AddPatient, GetPatients, RemovePatient, UpdatePatient} from './actions/patient.action'
import {Patient} from '../models/Patient'
import {SetLoggedInUser, SetSelectedPatient, SetState} from './actions/state.action'
import {PatientService} from '../services/patient.service'
import {PatientColumns} from '../models/Column'
import {RxService} from '../services/rx.service'
import {HistoryService} from '../services/history.service'
import {AllergyService} from '../services/allergy.service'
import {AddHistory, RemoveHistory, UpdateHistory} from './actions/history.action'
import {AddAllergy, RemoveAllergy, UpdateAllergy} from './actions/allergy.action'
import {AuthService} from '../services/auth.service'

const columns: PatientColumns = {
  rx: [
    {controlName: 'date', type: 'date', label: 'Prescribed on', required: true, hint: 'mm/dd/yyyy'},
    {controlName: 'drug', type: 'text', label: 'Drug', required: true, hint: 'Drug name'},
    {controlName: 'dosage', type: 'text', label: 'Dosage', required: true, hint: '100mg'},
    {controlName: 'reason', type: 'text', label: 'Reason for taking', required: true, hint: 'Pain'},
    {controlName: 'prescriber', type: 'text', label: 'Prescribed by', required: true, hint: 'Name, rank'}
  ],
  history: [
    {controlName: 'date', type: 'date', label: 'Onset', required: true, hint: 'mm/dd/yyyy'},
    {controlName: 'diagnosis', type: 'text', label: 'Diagnosis', required: true, hint: 'Concussion'},
    {controlName: 'treatment', type: 'text', label: 'Treatment', required: true, hint: 'Surgery'},
    {controlName: 'diagnoser', type: 'text', label: 'Diagnosed by', required: true, hint: 'Name, rank'}
  ],
  allergy: [
    {controlName: 'allergy', type: 'text', label: 'Allergy', required: true, hint: 'Penicillin'},
    {controlName: 'reaction', type: 'text', label: 'Reaction', required: true, hint: 'Hives'},
    {
      controlName: 'severity', type: 'radio', label: 'Severity', required: true, choices: [
        {label: 'Mild', value: 'Mild'},
        {label: 'Moderate', value: 'Moderate'},
        {label: 'Severe', value: 'Severe'},
      ]
    }
  ],
  details: [
    {controlName: 'name', type: 'text', label: 'Name', required: true, hint: 'Full name'},
    {controlName: 'age', type: 'number', label: 'Age', required: true, hint: 'Age in years'},
    {
      controlName: 'sex', type: 'radio', label: 'Sex', required: true, choices: [
        {label: 'Male', value: 'Male'},
        {label: 'Female', value: 'Female'}
      ]
    },
    {
      controlName: 'bloodType',
      type: 'drop',
      label: 'Blood Type',
      required: true,
      choices: [
        {label: 'Unknown', value: 'unknown'},
        {label: 'A+', value: 'A+'},
        {label: 'A-', value: 'A-'},
        {label: 'B+', value: 'B+'},
        {label: 'B-', value: 'B-'},
        {label: 'AB+', value: 'AB+'},
        {label: 'AB-', value: 'AB-'},
        {label: 'O+', value: 'O+'},
        {label: 'O-', value: 'O-'}
      ]
    },
    {controlName: 'pronouns', type: 'text', label: 'Pronouns', required: false, hint: 'She/her'},
    {controlName: 'race', type: 'text', label: 'Race', required: false, hint: 'Hispanic'}
  ]
}


export class PortalStateModel {
  patients: Patient[]
  columns: {}
  state: 'landing' | 'new' | 'patient'
  selectedPatient: Patient
  patientNames: Array<string>
  user: string
}

@State<PortalStateModel>({
  name: 'patients',
  defaults: {
    patients: undefined,
    columns,
    state: 'landing',
    selectedPatient: undefined,
    patientNames: [],
    user: undefined
  }
})

export class PortalState {
  constructor(
    private patientService: PatientService,
    private rxService: RxService,
    private historyService: HistoryService,
    private allergyService: AllergyService,
    private auth: AuthService
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

  @Selector()
  static getPatientNames(state: PortalStateModel) {
    return state.patientNames
  }

  @Selector()
  static getLoggedInUser(state: PortalStateModel) {
    return state.user
  }

  @Action(GetPatients)
  getPatients(ctx: StateContext<PortalStateModel>, {}: SetState) {
    this.patientService.getPatients().subscribe((resp) => {
      if (resp.success) {

        ctx.patchState({
          patients: resp.data,
          patientNames: resp.data.map(patient => patient.info.name)
        })
      } else {
        this.auth.deleteToken()
      }
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
    console.log('set to patient')
    ctx.patchState({
      state: 'patient',
      selectedPatient: payload
    })
  }

  @Action(SetLoggedInUser)
  setLoggedInUser(ctx: StateContext<PortalStateModel>, {payload}: SetLoggedInUser) {
    ctx.patchState({
      user: payload
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
    this.patientService.deletePatient(payload._id).subscribe(resp => {
      if (resp.success) {
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
      if (resp.success) {
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
      if (resp.success) {
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
        if (resp.success) {
          ctx.patchState({
            selectedPatient: resp.data
          })
          return ctx.dispatch(new GetPatients())
        } else {
          throw new Error(resp.message)
        }
      }
    })
  }

  @Action(UpdateRx)
  updateRx(ctx: StateContext<PortalStateModel>, {payload, patientID}: UpdateRx) {
    this.rxService.putRx(patientID, payload._id, payload).subscribe(resp => {
      if (resp.success) {
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
      if (resp.success) {
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
        if (resp.success) {
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
      if (resp.success) {
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
      if (resp.success) {
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
        if (resp.success) {
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
      if (resp.success) {
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

