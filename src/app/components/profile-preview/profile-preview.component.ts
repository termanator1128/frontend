import {Component} from '@angular/core'
import {Select} from '@ngxs/store'
import {PortalState} from '../../state/portal.state'
import {Observable} from 'rxjs'

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss']
})
export class ProfilePreviewComponent {
  @Select(PortalState.getLoggedInUser) user$: Observable<string>

  constructor() {
  }

}
