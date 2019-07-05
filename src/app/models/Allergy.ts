export interface Allergy {
  id: string
  allergy: string
  reaction: string
  severity: 'Mild' | 'Moderate' | 'Severe'
}
