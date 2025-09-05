import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'civicpulse-pwa',
  appId: '1:764129977591:web:bdc6c167602968acce5ff2',
  storageBucket: 'civicpulse-pwa.firebasestorage.app',
  apiKey: 'AIzaSyDbdimmanMdIRhzxzGDO0nZ5-Bn4-Dq2Vg',
  authDomain: 'civicpulse-pwa.firebaseapp.com',
  messagingSenderId: '764129977591',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
