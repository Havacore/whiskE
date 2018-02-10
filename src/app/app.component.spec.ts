import { Router } from '@angular/router';
import { environment } from './../environments/environment.prod';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './routing.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs/Observable';

const dbStub = {
  list: jest.fn()
};

const authStub = {
  signOut: jest.fn(() => undefined),
  user: Observable.of({displayName: 'Megaman'})
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        CoreModule,
        LoginModule,
        RouterTestingModule,
        DashboardModule
      ],
      providers: [
        {provide: AngularFireDatabase, useValue: dbStub},
        {provide: AuthService, useValue: authStub},
        {provide: Router, useValue: RouterTestingModule}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should login the user on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getUser();
    app.displayName.subscribe(name => expect(name).toBe('Megaman'));
  });


  describe('logout', () => {
    it('should logout the user', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.logout();
      app.displayName.subscribe(name => expect(name).toBe(''));
    });
  });

});
