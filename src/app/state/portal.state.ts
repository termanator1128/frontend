import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store'
import {Patient} from '../models/Patient'
import {AddPatient, RemovePatient, SetSelectedPatient, SetState, UpdatePatient} from './portal.action'

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
}

@State<PortalStateModel>({
  name: 'patients',
  defaults: {
    patients: [],
    columns,
    state: 'landing',
    selectedPatient: undefined
  }
})

export class PortalState implements NgxsOnInit {

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
    const patients: Patient[] = [
      {
        name: 'Sophie Richmond',
        scripts: [
          {
            date: '06/30/2019',
            drug: 'Vicodin',
            dosage: '500mg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
          {
            date: '06/30/2019',
            drug: 'Fentanyl',
            dosage: '100mcg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
          {
            date: '06/30/2019',
            drug: 'Amoxicilyn',
            dosage: '500mg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
        ],
        history: [
          {
            date: '06/30/2019',
            diagnosis: 'Concussion',
            diagnoser: 'Liam Salazar, M.D.'
          }
        ],
        allergies: [
          {
            allergy: 'Penicilin',
            reaction: 'hives',
            severity: 'Moderate'
          }
        ],
        details: {
          age: 21,
          sex: 'Female',
          pronouns: 'Feminine',
          dob: '06/30/2019',
          address: '2 Freedom Way',
          pictureSrc: '../../../assets/noimg.jpg'
        }
      },
      {
        name: 'Josh Parker',
        scripts: [
          {
            date: '06/30/2019',
            drug: 'Vicodin',
            dosage: '500mg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
          {
            date: '06/30/2019',
            drug: 'Fentanyl',
            dosage: '100mcg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
          {
            date: '06/30/2019',
            drug: 'Amoxicilyn',
            dosage: '500mg',
            reason: 'because',
            prescriber: 'Liam Salazar, M.D.'
          },
        ],
        history: [
          {
            date: '06/30/2019',
            diagnosis: 'Concussion',
            diagnoser: 'Liam Salazar, M.D.'
          }
        ],
        allergies: [
          {
            allergy: 'Penicilin',
            reaction: 'hives',
            severity: 'Moderate'
          }
        ],
        details: {
          age: 30,
          sex: 'Male',
          pronouns: 'Masculine',
          dob: '06/30/2019',
          address: '2 Freedom Way',
          pictureSrc: '../../../assets/noimg.jpg'
        }
      }
    ]
    ctx.patchState({
      patients
    })

  }

  @Action(SetState)
  setState(ctx: StateContext<PortalStateModel>, {payload}: SetState) {
    ctx.patchState({
      state: payload,
      selectedPatient: undefined
    })
  }

  @Action(AddPatient)
  add(ctx: StateContext<PortalStateModel>, {payload}: AddPatient) {
    const state = ctx.getState()
    ctx.patchState({
      patients: [...state.patients, payload]
    })
  }

  @Action(RemovePatient)
  remove(ctx: StateContext<PortalStateModel>, {payload}: RemovePatient) {
    ctx.patchState({
      patients: ctx.getState().patients.filter(a => a.name !== payload.name)
    })
  }

  @Action(UpdatePatient)
  update(ctx: StateContext<PortalStateModel>, {payload}: UpdatePatient) {
    ctx.patchState({
      patients: ctx.getState().patients.filter(a => a.name !== payload.name)
    })
  }

  @Action(SetSelectedPatient)
  setSelectedPatient(ctx: StateContext<PortalStateModel>, {payload}: SetSelectedPatient) {
    ctx.patchState({
      state: 'patient',
      selectedPatient: payload
    })
  }
}

