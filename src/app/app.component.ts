import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
<div style="text-align:center">
  <router-outlet></router-outlet>
</div>`,
  styleUrls: ['./app.component.css']
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

  saveThing(): void {
    const name = document.getElementById('testInput').value;
    if (name === '') {
      return;
    }
    const id = this.uuidv4();
    const testPerson: TestDocument = {
      name: name,
      id: id
    };
    this.db.database.ref('/testDocument/' + id).set(testPerson);
  }

  uuidv4(): string {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => {
      // tslint:disable-next-line
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
  }
}

interface TestDocument  {
  name: string;
  id: string;
}
