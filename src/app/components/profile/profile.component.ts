import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.auth.deleteToken()
    this.router.navigate(['profile/login'])
  }
}
