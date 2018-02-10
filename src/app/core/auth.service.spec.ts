import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const ngFireAuthStub = {
  authState: Observable.of({uid: 'uid-123'})
};

const ngFireStoreStub = {

};

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AngularFireAuth, useValue: ngFireAuthStub},
        {provide: AngularFirestore, useValue: ngFireStoreStub},
        {provide: Router, useValue: RouterTestingModule},
        ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
