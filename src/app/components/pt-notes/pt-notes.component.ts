import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core'
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'
import {EMPTY, Subject} from 'rxjs'

@Component({
  selector: 'app-pt-notes',
  templateUrl: './pt-notes.component.html',
  styleUrls: ['./pt-notes.component.scss']
})
export class PtNotesComponent implements OnDestroy {
  @Input() notes: string
  @Output() notesEdit: EventEmitter<string> = new EventEmitter()
  notes$ = new Subject<any>()
  private notesSub

  constructor() {
    this.notesSub = this.notes$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        this.edit(term.htmlValue)
        return EMPTY
      })
    ).subscribe()
  }

  edit(notes) {
    this.notesEdit.emit(notes)
  }

  ngOnDestroy(): void {
    if (this.notes$) {
      this.notes$.unsubscribe()
      this.notes$ = null
    }
  }
}
