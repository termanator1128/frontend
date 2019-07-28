import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent implements OnInit {
  @Input() form: FormGroup
  @Input() group: string
  @Input() title: string
  @Input() controlName: string
  @Input() selections: Array<{ value: string, inputID: string }>

  constructor() {
  }

  ngOnInit() {
  }

}
