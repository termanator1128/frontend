import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-pcr-list',
  templateUrl: './pcr-list.component.html',
  styleUrls: ['./pcr-list.component.scss']
})
export class PcrListComponent implements OnInit {
  showPCR = false

  constructor() {
  }

  ngOnInit() {
  }

  newPCR() {
    this.showPCR = true
  }

  closeNewPCR() {
    this.showPCR = false
  }

}
