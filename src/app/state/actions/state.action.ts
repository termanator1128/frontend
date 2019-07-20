import {Patient} from '../../models/Patient'

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

export class SetLoggedInUser {
  static readonly type = '[LOGIN] Set'

  constructor(public payload: string) {
  }
}
