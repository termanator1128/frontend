import {Component, Input, OnInit} from '@angular/core'
import {Patient} from '../models/Patient'

@Component({
  selector: 'app-pt-page',
  templateUrl: './pt-page.component.html',
  styleUrls: ['./pt-page.component.scss']
})
export class PtPageComponent implements OnInit {
  @Input() patient: Patient
  @Input() columns
  constructor() {
  }

  ngOnInit() {
  }

}
