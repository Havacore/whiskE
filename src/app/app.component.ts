import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <header>

  </header>
  <router-outlet></router-outlet>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  testDocuments$: Observable<any[]>;

  constructor(
    private router: Router,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.testDocuments$ = this.getTestDocuments();
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
