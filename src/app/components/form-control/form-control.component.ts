import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core'
import {PatientControl} from '../../models/Column'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit {
  @Input() row: PatientControl
  @Input() form: FormGroup

  constructor(private change: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.change.markForCheck()
  }

}
