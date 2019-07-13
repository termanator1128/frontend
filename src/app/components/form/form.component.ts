import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
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
  @Input() isPatient: boolean
  @Input() cols
  @Input() headerTitle
  @Input() forbiddenNames: Array<string>
  @Output() addRow: EventEmitter<any> = new EventEmitter()
  @Output() editRow: EventEmitter<any> = new EventEmitter()
  @Output() deleteRow: EventEmitter<any> = new EventEmitter()
  @Output() closeDialog: EventEmitter<any> = new EventEmitter()
  form: FormGroup
  showConfirmDelete = false

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

  createForm(): any {
    const cols: PatientColumns = this.cols
    this.form = this.formBuilder.group({})
    for (const key in cols) {
      if (cols.hasOwnProperty(key)) {
        const column = cols[key]
        const validators = []
        if (column.required) {
          validators.push(Validators.required)
        }
        if (column.controlName === 'name') {
          validators.push(this.noForbiddenNames.bind(this))
        }
        if (column.type === 'date') {
          validators.push(this.validateDate.bind(this))
        }
        if (!this.row) {
          this.form.addControl(cols[key], new FormControl(undefined, validators))
        } else {
          this.form.addControl(cols[key].controlName, new FormControl(this.row[cols[key].controlName], validators))
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

  confirmedDelete() {
    const deleteRow = this.collectFormData()
    deleteRow._id = this.row._id
    this.deleteRow.emit(deleteRow)
  }

  delete() {
    if (this.isPatient) {
      this.showConfirmDelete = true
    } else {
      this.confirmedDelete()
    }
  }

  hide() {
    this.collectFormData()
    this.closeDialog.emit()
  }

  noForbiddenNames(control: AbstractControl): { noForbiddenNames: boolean } | null {
    return (this.forbiddenNames.includes(control.value) && control.value !== this.row.name) ? {noForbiddenNames: true} : null
  }

  validateDate(control: AbstractControl): { validateDate: true } | null {
    const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
    return (!dateRegex.test(control.value) && control.value) ? {validateDate: true} : null
  }

}
