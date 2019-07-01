import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {FormBuilder, FormControl, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() row: any
  @Input() display: boolean
  @Input() new: boolean
  @Input() cols
  @Input() headerTitle
  @Output() addRow: EventEmitter<any> = new EventEmitter()
  @Output() editRow: EventEmitter<any> = new EventEmitter()
  @Output() deleteRow: EventEmitter<any> = new EventEmitter()
  @Output() closeDialog: EventEmitter<any> = new EventEmitter()
  form: FormGroup

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

  }

  createForm(): any {
    const cols = this.cols
    this.form = this.formBuilder.group({})
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        if (!this.row) {
          this.form.addControl(cols[key].field, new FormControl(undefined))
        } else {
          this.form.addControl(cols[key].field, new FormControl(this.row[cols[key].field]))
        }
      }
    }
    console.log(this.form)
  }

  collectFormData() {
    const obj = {}
    const form: FormGroup = this.form
    for (const key in form.controls) {
      obj[key] = form.get(key).value
    }
    return obj
  }

  ngOnChanges(): void {
    this.createForm()
  }

  save() {
    const newRow = this.collectFormData()
    this.addRow.emit(newRow)
  }

  edit() {
    const updateRow = this.collectFormData()
    this.editRow.emit(updateRow)
  }

  delete() {
    const deleteRow = this.collectFormData()
    this.deleteRow.emit(deleteRow)
  }

  hide() {
    this.collectFormData()
    this.closeDialog.emit()
  }

}
