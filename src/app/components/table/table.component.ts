import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: any[]
  @Input() cols: any[]
  @Input() tableTitle: string
  @Input() addRowButtonLabel: string
  @Input() addRowModalTitle: string
  @Output() addRow: EventEmitter<any> = new EventEmitter()
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

  delete(rowToBeDeleted) {
    this.deleteRow.emit(rowToBeDeleted)
    this.reset()
  }

  save(newRow) {
    this.addRow.emit(newRow)
    this.reset()
  }

  edit(editedRow) {
    this.editRow.emit(editedRow)
    this.reset()
  }

  hideDialog() {
    this.reset()
  }
}
