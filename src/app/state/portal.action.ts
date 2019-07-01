import {Patient} from '../models/Patient'


export class AddPatient {
  static readonly type = '[PATIENT] Add'

  constructor(public payload: Patient) {
  }
}

export class RemovePatient {
  static readonly type = '[PATIENT] Remove'

  constructor(public payload: Patient) {
  }
}

export class UpdatePatient {
  static readonly type = '[PATIENT] Update'

  constructor(public payload: Patient) {
  }
}

export class SetState {
  static readonly type = '[STATE] Set'

  constructor(public payload: 'landing' | 'new' | 'patient') {
  }
}

export class SetSelectedPatient {
  static readonly type = '[PATIENT] Set'

  constructor(public payload: Patient) {
  }
}
