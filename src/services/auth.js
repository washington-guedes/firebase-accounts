import FirebaseInstance from '../infra/firebase';

export class AuthService {
  constructor() {
    this.auth = FirebaseInstance.auth();
  }

  isAuthenticated() {
    console.log(this.auth.currentUser);

    return !!this.auth.currentUser;
  }
}

export default AuthService;
