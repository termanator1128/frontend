export interface Allergy {
  _id: string
  allergy: string
  reaction: string
  severity: 'Mild' | 'Moderate' | 'Severe'
}
