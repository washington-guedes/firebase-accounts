import firebase from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import postRobot from 'post-robot';
import FirebaseInstance from '../infra/firebase';

const { hostname: parentHostname, origin: parentOrigin } = window.parent.location;
const parentExists = parentOrigin !== process.env.VUE_APP_FRONTEND_ACCOUNTS_URL;
const parentValid = parentHostname.endsWith(process.env.VUE_APP_HOSTNAME_MUST_END_WITH);
const allowCommunication = parentExists && parentValid;

const loggedIn$ = new Subject();
const loggedOut$ = new Subject();
const lastReceivedUserState$ = new ReplaySubject(1);

loggedIn$.subscribe(() => {
  if (allowCommunication) {
    const sessionCookie = document.cookie.match(/\b__Secure_id=(\S+);?/).pop();
    postRobot.send(window.parent, 'loggedIn', { __Secure_id: sessionCookie });
  }
});

export class AuthService {
  constructor() {
    this.pageLoaded = false;

    this.auth = FirebaseInstance.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    this.auth.onAuthStateChanged((value) => {
      if (value) {
        loggedIn$.next();
      } else {
        loggedOut$.next();
        if (this.pageLoaded) {
          window.location.href = '/login';
        }
      }

      this.pageLoaded = true;
      lastReceivedUserState$.next(value);
    });

    if (allowCommunication) {
      postRobot.on('invalidateSession', () => this.logout());
      postRobot.on('isAuthenticated', () => this.isAuthenticated());
      postRobot.on('hasAccessTo', (x) => this.hasAccessTo(x));
    }

    loggedOut$.subscribe(() => {
      if (allowCommunication) {
        postRobot.send(window.parent, 'loggedOut');
      }
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
      lastReceivedUserState$.pipe(first()).subscribe((user) => resolve(user));
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
