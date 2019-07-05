import {Rx} from './Rx'
import {MedicalHistory} from './MedicalHistory'
import {Allergy} from './Allergy'
import {PatientInfo} from './PatientInfo'

export interface Patient {
  id: string
  info: PatientInfo
  scripts: Rx[]
  history: MedicalHistory[]
  allergies: Allergy[]
  notes: string
}
