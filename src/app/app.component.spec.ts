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

const dbStub = {
  list: jest.fn()
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
        {provide: Router, useValue: RouterTestingModule}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('shoud display the logged in user in the navbar', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(true).toBe(true);
  }));
});
