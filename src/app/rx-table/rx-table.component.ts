import {Component, OnInit} from '@angular/core';
import {Rx} from "../rx";

@Component({
  selector: 'app-rx-table',
  templateUrl: './rx-table.component.html',
  styleUrls: ['./rx-table.component.scss']
})
export class RxTableComponent implements OnInit {
  drugs: any[]
  drug: any
  newDrug: boolean
  selectedDrug: Rx
  displayDialog = false
  type: string

  cols = [
    {field: 'date', header: 'Date'},
    {field: 'drug', header: 'Drug'},
    {field: 'dosage', header: 'Dosage'},
    {field: 'reason', header: 'Reason for taking'},
    {field: 'prescriber', header: 'Prescribed by'}
  ];

  constructor() {
  }

  ngOnInit() {
    this.drugs = [
      {
        date: new Date('Tue Dec 31, 2019'),
        drug: 'Vicodin',
        dosage: '500mg',
        reason: 'because',
        prescriber: 'Liam Salazar, M.D.'
      },
      {
        date: new Date('Tue Dec 31, 2019'),
        drug: 'Fentanyl',
        dosage: '100mcg',
        reason: 'because',
        prescriber: 'Liam Salazar, M.D.'
      },
      {
        date: new Date('Tue Dec 31, 2019'),
        drug: 'Amoxicilyn',
        dosage: '500mg',
        reason: 'because',
        prescriber: 'Liam Salazar, M.D.'
      },
    ]
  }

  onRowSelect(e) {
    this.type = 'edit'
    console.log('select')
    this.newDrug = false;
    this.drug = this.cloneDrug(e.data);
    console.log(this.drug)
    this.displayDialog = true;
  }

  showDialogToAdd() {
    this.type = 'add'
    this.newDrug = true;
    this.drug = {};
    this.displayDialog = true;
    console.log(this.displayDialog)
  }

  delete() {
    let index = this.drugs.indexOf(this.selectedDrug);
    this.drugs = this.drugs.filter((val, i) => i != index);
    this.drug = null;
    this.displayDialog = false;
  }

  save() {
    let drugs = [...this.drugs];
    if (this.newDrug)
      drugs.push(this.drug);
    else
      drugs[this.drugs.indexOf(this.selectedDrug)] = this.drug;

    this.drugs = drugs;
    this.drug = null;
    this.displayDialog = false;
  }

  cloneDrug(c: Rx): any {
    let drug = {};
    for (let prop in c) {
      drug[prop] = c[prop];
    }
    return drug;
  }

  hideDialog() {
    this.displayDialog = false
  }
}
