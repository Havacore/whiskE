import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="main-container">
      <h3>Sup Bud</h3>
      <p>Login to get started...</p>

      <button (click)="login()">
        <i class="fa fa-google"></i> Connect Google
      </button>
    </div>
  `,
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login(): void {
    this.auth.googleLogin();
  }
}
