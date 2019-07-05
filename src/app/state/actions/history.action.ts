import {MedicalHistory} from '../../models/MedicalHistory'

export class AddHistory {
  static readonly type = '[HISTORY] Add'

  constructor(public payload: MedicalHistory, public patientID: string) {
  }
}

export class RemoveHistory {
  static readonly type = '[HISTORY] Remove'

  constructor(public payload: MedicalHistory, public patientID: string) {
  }
}

export class UpdateHistory {
  static readonly type = '[HISTORY] Update'

  constructor(public payload: MedicalHistory, public patientID: string) {
  }
}
