export interface PatientSummary {
  name: string
  age: number
  sex: 'Male' | 'Female'
  pronouns: string
  dob: Date,
  address: string
  pictureSrc: string
}
