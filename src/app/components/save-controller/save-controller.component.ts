import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-save-controller',
  templateUrl: './save-controller.component.html',
  styleUrls: ['./save-controller.component.scss']
})
export class SaveControllerComponent implements OnChanges {
  @Input() new: boolean
  @Input() form: FormGroup
  @Output() hideModal: EventEmitter<any> = new EventEmitter()
  @Output() editForm: EventEmitter<any> = new EventEmitter()
  @Output() saveForm: EventEmitter<any> = new EventEmitter()
  @Output() deleteForm: EventEmitter<any> = new EventEmitter()
  saveDisabled: boolean

  constructor() {
  }

  ngOnChanges(): void {
    this.saveDisabled = true
    this.form.valueChanges.subscribe(changes => {
      (this.form.valid && this.form.dirty) ? this.saveDisabled = false : this.saveDisabled = true
    })
  }

  hide() {
    this.hideModal.emit()
  }

  edit() {
    this.editForm.emit()
  }

  save() {
    this.saveForm.emit()
  }

  delete() {
    this.deleteForm.emit()
  }

}
