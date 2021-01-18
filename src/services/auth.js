import firebase from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import FirebaseInstance from '../infra/firebase';

export class AuthService {
  constructor() {
    this.auth = FirebaseInstance.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    this.logout$ = new Subject();
    this.lastReceivedUserState$ = new ReplaySubject(1);

    this.auth.onAuthStateChanged((value) => {
      if (!value) {
        this.logout$.next();
      }
      this.lastReceivedUserState$.next(value);
    });
  }

  async login(email, password) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const token = await this.auth.currentUser.getIdToken();
      document.cookie = `__Secure_id=${token}; Domain=${process.env.VUE_APP_FIREBASE_COOKIES_DOMAIN}; Secure`;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found');
      }
      console.error(error);
    }
  }

  async signup(email, password) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email já está em uso');
        return;
      }
      if (error.code === 'auth/weak-password') {
        alert(error.message);
      }
      console.error(error);
    }
  }

  async getUser() {
    return new Promise((resolve) => {
      this.lastReceivedUserState$.pipe(first()).subscribe((user) => resolve(user));
    });
  }

  async isAuthenticated() {
    const user = await this.getUser();
    return !!user;
  }

  async hasAccessTo(something) {
    if (await this.isAuthenticated()) {
      throw new Error(`Missing implementation, tried to check access against ${something}`);
    }
    return false;
  }

  async logout() {
    await this.auth.signOut();
  }
}

export default AuthService;
