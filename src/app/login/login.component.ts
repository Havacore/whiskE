import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <h3>Sup Bud</h3>
    <p>Login to get started...</p>

    <button (click)="login()">
      <i class="fa fa-google"></i> Connect Google
    </button>
  `,
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  private login(): void {
    this.auth.googleLogin();
  }
}
