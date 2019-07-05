import {Component, Input, OnInit} from '@angular/core'
import {Patient} from '../../models/Patient'
import {Rx} from '../../models/Rx'
import {Allergy} from '../../models/Allergy'
import {MedicalHistory} from '../../models/MedicalHistory'
import {Store} from '@ngxs/store'
import {UpdatePatient} from '../../state/actions/patient.action'
import {AddRx, RemoveRx, UpdateRx} from '../../state/actions/rx.action'
import {AddHistory, RemoveHistory, UpdateHistory} from '../../state/actions/history.action'
import {AddAllergy, RemoveAllergy, UpdateAllergy} from '../../state/actions/allergy.action'

@Component({
  selector: 'app-pt-tabs',
  templateUrl: './pt-tabs.component.html',
  styleUrls: ['./pt-tabs.component.scss']
})
export class PtTabsComponent implements OnInit {
  @Input() columns
  @Input() patient: Patient
  activeTab = 0

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  handleChange(e) {
    this.activeTab = e.index
  }

  changeNotes(notes: string) {
    const patient = JSON.parse(JSON.stringify(this.patient))
    patient.notes = notes
    this.store.dispatch(new UpdatePatient(patient))
  }

  addRx(prescriptions: Rx) {
    this.store.dispatch(new AddRx(prescriptions, this.patient._id))
  }

  editRx(prescriptions: Rx) {
    this.store.dispatch(new UpdateRx(prescriptions, this.patient._id))
  }

  deleteRx(prescriptions: Rx) {
    this.store.dispatch(new RemoveRx(prescriptions, this.patient._id))
  }

  addHistory(history: MedicalHistory) {
    this.store.dispatch(new AddHistory(history, this.patient._id))
  }

  editHistory(history: MedicalHistory) {
    this.store.dispatch(new UpdateHistory(history, this.patient._id))
  }

  deleteHistory(history: MedicalHistory) {
    this.store.dispatch(new RemoveHistory(history, this.patient._id))
  }

  addAllergy(allergy: Allergy) {
    this.store.dispatch(new AddAllergy(allergy, this.patient._id))
  }

  editAllergy(allergy: Allergy) {
    this.store.dispatch(new UpdateAllergy(allergy, this.patient._id))
  }

  deleteAllergy(allergy: Allergy) {
    this.store.dispatch(new RemoveAllergy(allergy, this.patient._id))
  }
}
