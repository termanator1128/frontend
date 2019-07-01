import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-pt-notes',
  templateUrl: './pt-notes.component.html',
  styleUrls: ['./pt-notes.component.scss']
})
export class PtNotesComponent implements OnInit {
  @Input() notes: string
  @Output() notesEdit: EventEmitter<string> = new EventEmitter()
  constructor() {
  }

  ngOnInit() {
  }

  edit() {
    this.notesEdit.emit(this.notes)
  }
}
