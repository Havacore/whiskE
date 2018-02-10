import { BehaviorSubject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [``]
})
export class DashboardComponent implements OnInit {

  firstName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((thing) => {
      this.firstName.next(thing.displayName);
    });
  }

}
