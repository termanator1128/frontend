import {Component, Input, OnInit} from '@angular/core'
import {Patient} from '../../models/Patient'
import {Rx} from '../../models/Rx'
import {Allergy} from '../../models/Allergy'
import {MedicalHistory} from '../../models/MedicalHistory'
import {Store} from '@ngxs/store'
import {UpdatePatient} from '../../state/actions/patient.action'
import {AddRx, RemoveRx, UpdateRx} from '../../state/actions/rx.action'

@Component({
  selector: 'app-pt-tabs',
  templateUrl: './pt-tabs.component.html',
  styleUrls: ['./pt-tabs.component.scss']
})
export class PtTabsComponent implements OnInit {
  @Input() columns
  @Input() patient: Patient
  activeTab = 0

  // TODO call state here
  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  handleChange(e) {
    this.activeTab = e.index
  }

  changeNotes(notes: string) {
    this.patient.notes = notes
    this.store.dispatch(new UpdatePatient(this.patient))
  }

  addRx(prescriptions: Rx) {
    this.store.dispatch(new AddRx(prescriptions, this.patient.id))
  }

  editRx(prescriptions: Rx) {
    this.store.dispatch(new UpdateRx(prescriptions, this.patient.id))
  }

  deleteRx(prescriptions: Rx) {
    this.store.dispatch(new RemoveRx(prescriptions, this.patient.id))
  }


  changeAllergies(allergies: Allergy[]) {
    this.patient.allergies = allergies
    this.store.dispatch(new UpdatePatient(this.patient))
  }

  changeHistory(history: MedicalHistory[]) {
    this.patient.history = history
    this.store.dispatch(new UpdatePatient(this.patient))
  }
}
