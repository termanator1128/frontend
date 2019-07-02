import {Component, Input, OnInit} from '@angular/core'
import {Patient} from '../../models/Patient'

@Component({
  selector: 'app-pt-tabs',
  templateUrl: './pt-tabs.component.html',
  styleUrls: ['./pt-tabs.component.scss']
})
export class PtTabsComponent implements OnInit {
  @Input() columns
  @Input() patient: Patient
  activeTab = 0

  constructor() {
  }

  handleChange(e) {
    this.activeTab = e.index
  }

  saveNotes(notes) {

  }

  saveRx(row) {
  }

  editRx(row) {

  }

  deleteRx(row) {

  }

  saveHist(row) {

  }

  editHist(row) {

  }

  deleteHist(row) {

  }

  saveAllergy(row) {

  }

  editAllergy(row) {
    console.log(row)
  }

  deleteAllergy(row) {
  }

  ngOnInit() {
  }

}
