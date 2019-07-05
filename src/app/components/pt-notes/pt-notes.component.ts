import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-pt-notes',
  templateUrl: './pt-notes.component.html',
  styleUrls: ['./pt-notes.component.scss']
})
export class PtNotesComponent {
  @Input() notes: string
  @Output() notesEdit: EventEmitter<string> = new EventEmitter()
  constructor() {
  }

  edit() {
    this.notesEdit.emit(this.notes)
  }
}
