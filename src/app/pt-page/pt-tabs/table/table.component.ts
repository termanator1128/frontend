import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: any[]
  @Input() cols: any[]
  @Input() tableLabel: string
  @Input() addLabel: string
  @Output() saveRow: EventEmitter<any> = new EventEmitter()
  @Output() editRow: EventEmitter<any> = new EventEmitter()
  @Output() deleteRow: EventEmitter<any> = new EventEmitter()
  selectedRow: any
  visible = false
  new: boolean

  constructor() {
  }

  static cloneRow(row: any): any {
    const newRow = {}
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        newRow[key] = row[key]
      }
    }
    return newRow
  }

  ngOnInit() {
  }

  reset() {
    this.visible = false
    this.selectedRow = null
  }

  onRowSelect(e) {
    this.new = false
    this.selectedRow = TableComponent.cloneRow(e.data)
    this.visible = true
  }

  showDialogToAdd() {
    this.new = true
    this.selectedRow = {}
    this.visible = true
  }

  delete(row) {
    const index = this.rows.indexOf(this.selectedRow)
    this.rows = this.rows.filter((val, i) => i !== index)
    this.deleteRow.emit(row)
    this.reset()
  }

  save(row) {
    this.saveRow.emit(row)
    this.rows.push(row)
    this.reset()
  }

  edit(row) {
    this.editRow.emit(row)
    this.rows.push(row)
    this.reset()
  }

  hideDialog() {
    this.reset()
  }
}
