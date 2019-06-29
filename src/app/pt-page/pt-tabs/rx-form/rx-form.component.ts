import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {Rx} from '../../../models/Rx'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-rx-form',
  templateUrl: './rx-form.component.html',
  styleUrls: ['./rx-form.component.scss']
})
export class RxFormComponent implements OnInit, OnChanges {
  @Input() drug: any
  @Input() display: boolean
  @Input() type: 'edit' | 'add'
  @Output() onSave: EventEmitter<Rx> = new EventEmitter()
  @Output() onDelete: EventEmitter<Rx> = new EventEmitter()
  @Output() onClose: EventEmitter<any> = new EventEmitter()
  form: FormGroup


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // console.log('here')
  }

  ngOnChanges(): void {
    if (this.drug) {
      this.form = this.formBuilder.group({
        date: this.drug.date,
        drug: this.drug.drug,
        dosage: this.drug.dosage,
        reason: this.drug.reason,
        prescriber: this.drug.prescriber
      })
    } else {
      this.form = this.formBuilder.group({
        date: undefined,
        drug: undefined,
        dosage: undefined,
        reason: undefined,
        prescriber: undefined
      })
    }
  }

  save() {
    const rx: Rx = {
      date: this.form.controls.date.value,
      drug: this.form.controls.drug.value,
      dosage: this.form.controls.dosage.value,
      reason: this.form.controls.reason.value,
      prescriber: this.form.controls.prescriber.value
    }
    console.log(rx)
  }

  delete() {

  }

  hide() {
    this.onClose.emit()
  }

}
