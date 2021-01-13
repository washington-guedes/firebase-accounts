import FirebaseInstance from '../infra/firebase';

export class AuthService {
  constructor() {
    this.auth = FirebaseInstance.auth();
  }

  async login(email, password) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
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

  user() {
    return this.auth.currentUser;
  }

  isAuthenticated() {
    return !!this.user();
  }

  hasAccessTo() {
    if (this.isAuthenticated()) {
      throw new Error('Missing implementation');
    }
    return false;
  }

  isAccessError(error) {
    console.log('¿isAccessError?', error);
    return !this.isAuthenticated();
  }

  async logout() {
    await this.auth.signOut();
  }
}

export default AuthService;
