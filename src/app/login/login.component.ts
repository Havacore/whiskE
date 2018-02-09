import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-login',
  template: `
<h3>Sup Bud</h3>
  <p>Login to get started...</p>

  <button (click)="auth.googleLogin()">
      <i class="fa fa-google"></i> Connect Google
  </button>
`,
  styleUrls: []
})
export class LoginComponent {

  constructor(
    private auth: AuthService
  ) {}
}
