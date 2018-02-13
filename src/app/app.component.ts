import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './core/auth.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <header>
  <div class="header__content">
    <div class="header__title-and-search">
      <div class="header__title">🥃    WhiskE</div>
      <div>
        <input id="search-box">
      </div>
    </div>
    <div class="header__user-and-signout">
      <div class="header__user-container" *ngIf="displayName$$ | async as displayName">
        <a class="jbutton" (click)="toggleUserDropdown()">{{ displayName }}</a>
        <div class="header__user-dropdown" [ngClass]="{ 'hidden': !dropDownToggled }">
          <a class="dropdown-item" (click)="goTo('create-event')">Create Event</a>
          <a class="dropdown-item" (click)="logout()">Sign Out</a>
        </div>
      </div>
    </div>
  </div>
  </header>
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayName$$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  dropDownToggled = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.auth.user.subscribe((thing) => {
      if (thing && thing.hasOwnProperty('displayName')) {
        this.displayName$$.next(thing.displayName);
      } else {
        this.displayName$$.next('Welcome');
      }
    });
  }

  toggleUserDropdown(): void {
    this.dropDownToggled = !this.dropDownToggled;
  }

  logout(): void {
    this.dropDownToggled = false;
    this.auth.signOut();
  }

  goTo(destination: string): void {
    this.router.navigateByUrl(destination);
    this.dropDownToggled = false;
  }


  // saveThing(): void {
  //   const name = document.getElementById('testInput').value;
  //   if (name === '') {
  //     return;
  //   }
  //   const id = this.uuidv4();
  //   const testPerson: TestDocument = {
  //     name: name,
  //     id: id
  //   };
  //   this.db.database.ref('/testDocument/' + id).set(testPerson);
  // }

}

interface TestDocument  {
  name: string;
  id: string;
}
