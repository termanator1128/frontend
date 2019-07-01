import {Rx} from './Rx'
import {MedicalHistory} from './MedicalHistory'
import {Allergy} from './Allergy'
import {PatientSummary} from './patientsummary'

export interface Patient {
  name: string
  details: PatientSummary
  scripts: Rx[]
  history: MedicalHistory[]
  allergies: Allergy[]
  notes: string
}
