import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {
  @Input() form: FormGroup

  constructor() {
  }

  ngOnInit() {
  }

}
