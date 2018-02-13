import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../environments/environment.prod';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './routing.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs/Observable';
import { CreateEventModule } from './create-event/create-event.module';

const dbStub = {
  list: jest.fn()
};

const authStub = {
  signOut: jest.fn(() => undefined),
  user: Observable.of({displayName: 'Megaman'})
};

const routerStub = {
  navigateByUrl: jest.fn(() => undefined)
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
        AngularFirestoreModule,
        AngularFireAuthModule,
        CoreModule,
        LoginModule,
        RouterTestingModule,
        DashboardModule,
        CreateEventModule,
        FormsModule
      ],
      providers: [
        {provide: AngularFireDatabase, useValue: dbStub},
        {provide: AuthService, useValue: authStub},
        {provide: Router, useValue: routerStub}
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
    app.displayName$$.subscribe(name => expect(name).toBe('Megaman'));
  });

  it('should display a welcome message if there is no user', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const unAuthedService = {
      user: Observable.of({})
    };
    app.auth = unAuthedService;
    app.getUser();
    app.displayName$$.subscribe(name => expect(name).toBe('Welcome'));
  });

  describe('logout', () => {
    it('should logout the user', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.logout();
      app.displayName$$.subscribe(name => expect(name).toBe(''));
    });

    it('should close the dropdown', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.dropDownToggled = true;
      app.logout();
      expect(app.dropDownToggled).toBeFalsy();
    });
  });

  describe('goTo', () => {
    it('should go to the sepecified location', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.goTo('location');
      expect(app.router.navigateByUrl).toHaveBeenCalledWith('location');
    });

    it('should close the dropdown', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.dropDownToggled = true;
      app.goTo('location');
      expect(app.dropDownToggled).toBeFalsy();
    });
  });

});
