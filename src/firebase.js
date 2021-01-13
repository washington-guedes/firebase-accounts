import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

if (Object.values(config).some((x) => !x)) {
  console.log(config);
  throw new Error('Confira as configurações do Firebase no arquivo .env');
}

const instance = firebase.initializeApp(config);

export default instance;
