import { BehaviorSubject } from 'rxjs/Rx';
import { AuthService } from './core/auth.service';
import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
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
      <div class="header__user-container">{{ displayName | async }}</div>
      <a href="#" (click)="logout()">Sign Out</a>
    </div>
  </div>
  </header>
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  testDocuments$: Observable<any[]>;
  displayName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.testDocuments$ = this.getTestDocuments();
    this.auth.user.subscribe((thing) => {
      this.displayName.next(thing.displayName);
    });
  }

  getUser(): void {
    this.auth.user.subscribe((thing) => {
      this.displayName.next(thing.displayName);
    });
  }

  logout(): void {
    this.auth.signOut();
  }


  getTestDocuments(): Observable<any[]> {
    return this.db.list('/testDocument').valueChanges();
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
