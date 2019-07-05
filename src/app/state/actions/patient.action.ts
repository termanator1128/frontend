import {Patient} from '../../models/Patient'

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

export class GetPatients {
  static readonly type = '[PATIENTS] GET'

  constructor() {
  }
}
