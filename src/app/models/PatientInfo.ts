import {SelectItem} from 'primeng/api'

export interface PatientInfo {
  _id: string
  name: string
  age: number
  sex: 'Male' | 'Female'
  pronouns: string
  race: string
  bloodType: SelectItem[]
}
