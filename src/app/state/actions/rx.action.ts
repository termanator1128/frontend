import {Rx} from '../../models/Rx'

export class AddRx {
  static readonly type = '[RX] Add'

  constructor(public payload: Rx, public patientID: string) {
  }
}

export class RemoveRx {
  static readonly type = '[RX] Remove'

  constructor(public payload: Rx, public patientID: string) {
  }
}

export class UpdateRx {
  static readonly type = '[RX] Update'

  constructor(public payload: Rx, public patientID: string) {
  }
}
