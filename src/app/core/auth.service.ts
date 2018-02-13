import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;
  private isLoggedIn: boolean;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          this.router.navigateByUrl('/dashboard');
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          this.isLoggedIn = false;
          return Observable.of(null);
        }
      });
  }

  set loggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }

  get loggedIn(): boolean {
    return this.isLoggedIn;
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.isLoggedIn = true;
        this.updateUserData(credential.user);
        this.router.navigateByUrl('/dashboard');
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
