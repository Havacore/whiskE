import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="https://whiskyshow.com/images/media/50117ca2e3c6af4eeb72289fc477d743.jpg">
  <input id="testInput">
  <a (click)="saveThing()" class="button">Save a Thing</a>
  <div class="test-container">
    <ul *ngFor="let thing of testDocuments$ | async">
      <li>{{thing.name}}</li>
    </ul>
  </div>
</div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  testDocuments$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {}

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
    const testPerson: testDocument = {
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

interface testDocument  {
  name: string;
  id: string;
}
