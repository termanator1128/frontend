import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-pcr-form',
  templateUrl: './pcr-form.component.html',
  styleUrls: ['./pcr-form.component.scss']
})
export class PcrFormComponent implements OnInit {
  pcr: FormGroup
  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter()
  vitalCols = [
    {controlName: 'time', type: 'text', label: 'Time', required: true, hint: '8:34PM et'},
    {controlName: 'bp', type: 'text', label: 'BP', required: true, hint: '120/80 mmHG'},
    {controlName: 'pulse', type: 'text', label: 'Pulse', required: true, hint: '81'},
    {controlName: 'resp', type: 'text', label: 'Respiration', required: true, hint: '18'},
    {controlName: 'oxy', type: 'text', label: 'O2', required: false, hint: '97'},
  ]
  drugCols = [
    {controlName: 'drug', type: 'text', label: 'Drug', required: true, hint: 'Fentanyl'},
    {controlName: 'dose', type: 'text', label: 'Dose', required: true, hint: '100mcg'},
    {
      controlName: 'route', type: 'radio', label: 'Route', required: true, choices: [
        {label: 'Oral', value: 'Oral'},
        {label: 'Nasal', value: 'Nasal'},
        {label: 'IV', value: 'IV'},
        {label: 'IM', value: 'IM'},
        {label: 'IO', value: 'IO'},
      ]
    },
  ]
  medicalArr = [
    {value: 'Abdominal/GI', inputID: 'medical1'},
    {value: 'Cardiac', inputID: 'medical2'},
    {value: 'DOA - NO CPR', inputID: 'medical3'},
    {value: 'Psychiatric', inputID: 'medical4'},
    {value: 'Sepsis/Infection', inputID: 'medical5'},
    {value: 'Other Neuro', inputID: 'medical6'},
    {value: 'Respiratory', inputID: 'medical7'},
    {value: 'Diabetic', inputID: 'medical8'},
    {value: 'OD / poison', inputID: 'medical9'},
    {value: 'Seizure', inputID: 'medical10'},
    {value: 'Other Medical', inputID: 'medical11'},
    {value: 'None | N/A', inputID: 'medical12'},
  ]
  traumaArr = [
    {value: 'Abdomen', inputID: ' trauma1'},
    {value: 'Extremities', inputID: 'trauma2'},
    {value: 'Head/Face', inputID: 'trauma3'},
    {value: 'Pelvic', inputID: 'trauma4'},
    {value: 'Chest', inputID: 'trauma5'},
    {value: 'Musculoskeletal', inputID: 'trauma6'},
    {value: 'Neck/Back', inputID: 'trauma7'},
    {value: 'Multi-Systems', inputID: 'trauma8'},
    {value: 'N/A', inputID: 'trauma9'},
  ]
  mechArr = [
    {value: 'None', inputID: ' mechanism1'},
    {value: 'Dashboard Deformed', inputID: 'mechanism2'},
    {value: 'Steering Wheel Deformed', inputID: 'trauma3'},
    {value: 'Ejection', inputID: 'mechanism3'},
    {value: 'Windshield', inputID: 'mechanism4'},
    {value: 'Entrapment', inputID: 'mechanism5'},
    {value: 'Pinned in Vehicle', inputID: 'mechanism6'},
    {value: 'DOA Same Vehicle', inputID: 'mechanism7'},
    {value: 'Rollover', inputID: 'mechanism8'},
    {value: 'Auto-Pedestrian', inputID: 'mechanism9'},
    {value: 'Motorcycle', inputID: 'mechanism10'},
    {value: 'Penetrating Injury - Gunshot', inputID: 'mechanism11'},
    {value: 'Penetrating Injury - Knife', inputID: 'mechanism12'},
    {value: 'Penetrating Injury - Other', inputID: 'mechanism13'},
    {value: 'Blunt Injury', inputID: 'mechanism14'},
    {value: 'Fall/Jump', inputID: 'mechanism15'},
    {value: 'Driver - MVA', inputID: 'mechanism16'},
    {value: 'Passenger - MVA', inputID: 'mechanism17'},
    {value: 'Other', inputID: 'mechanism18'},
  ]

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.pcr = this.formBuilder.group({
      techName1: ['', Validators.required],
      techId1: ['', Validators.required],
      techName2: [''],
      techId2: [''],
      shiftDate: ['', Validators.required],
      outcome: ['', Validators.required],
      chief: ['', Validators.required],
      medical: ['', Validators.required],
      trauma: ['', Validators.required],
      mechanism: ['', Validators.required],
      vitals: [''],
      drugs: ['']
    })
    console.log(this.pcr)
  }

  cancel() {
    this.cancelEmitter.emit()
  }

  addVital(vitals) {
    console.log('add')
    console.log(vitals)
  }

  editVital(vitals) {
    console.log('edit')
    console.log(vitals)
  }

  deleteVital(vitals) {
    console.log('remove')
    console.log(vitals)
  }

  addDrug(drug) {
    console.log('add')
    console.log(drug)
    console.log(this.pcr.controls.mechanism.value)
  }

  editDrug(drug) {
    console.log('edit')
    console.log(drug)
  }

  deleteDrug(drug) {
    console.log('remove')
    console.log(drug)
  }
}

