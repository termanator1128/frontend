import {Component, Input, OnInit} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-shift-complaint',
  templateUrl: './shift-complaint.component.html',
  styleUrls: ['./shift-complaint.component.scss']
})
export class ShiftComplaintComponent implements OnInit {
  @Input() form: FormGroup

  constructor() {
  }

  ngOnInit() {
  }

}
