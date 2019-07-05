import {Allergy} from '../../models/Allergy'

export class AddAllergy {
  static readonly type = '[ALLERGY] Add'

  constructor(public payload: Allergy, public patientID: string) {
  }
}

export class RemoveAllergy {
  static readonly type = '[ALLERGY] Remove'

  constructor(public payload: Allergy, public patientID: string) {
  }
}

export class UpdateAllergy {
  static readonly type = '[ALLERGY] Update'

  constructor(public payload: Allergy, public patientID: string) {
  }
}
