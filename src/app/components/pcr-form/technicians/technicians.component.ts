import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-technicians',
  templateUrl: './technicians.component.html',
  styleUrls: ['./technicians.component.scss']
})
export class TechniciansComponent implements OnInit {
  @Input() form: FormGroup

  constructor() {
  }

  ngOnInit() {
  }

}
