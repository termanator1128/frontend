export interface Allergy {
  id: number
  allergy: string
  reaction: string
  severity: 'Mild' | 'Moderate' | 'Severe'
}
