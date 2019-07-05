export interface PatientControl {
  controlName: string
  required: boolean
  label: string
  type: string
}

export interface PatientColumns {
  rx: Array<PatientControl>
  history: Array<PatientControl>
  allergy: Array<PatientControl>
  details: Array<PatientControl>
}

