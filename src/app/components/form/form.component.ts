import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {PatientColumns} from '../../models/Column'

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
    const cols: PatientColumns = this.cols
    this.form = this.formBuilder.group({})
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        if (!this.row) {
          this.form.addControl(cols[key], new FormControl(undefined))
        } else {
          this.form.addControl(cols[key].controlName, new FormControl(this.row[cols[key].controlName],
            cols[key].required ? Validators.required : null))
        }
      }
    }
  }

  collectFormData() {
    const obj: any = {}
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
    newRow.id = this.row.id
    this.addRow.emit(newRow)
  }

  edit() {
    const updateRow = this.collectFormData()
    updateRow._id = this.row._id
    this.editRow.emit(updateRow)
  }

  delete() {
    const deleteRow = this.collectFormData()
    deleteRow._id = this.row._id
    this.deleteRow.emit(deleteRow)
  }

  hide() {
    this.collectFormData()
    this.closeDialog.emit()
  }

}