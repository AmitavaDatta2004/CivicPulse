'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDbdimmanMdIRhzxzGDO0nZ5-Bn4-Dq2Vg',
  authDomain: 'civicpulse-pwa.firebaseapp.com',
  projectId: 'civicpulse-pwa',
  storageBucket: 'civicpulse-pwa.firebasestorage.app',
  messagingSenderId: '764129977591',
  appId: '1:764129977591:web:bdc6c167602968acce5ff2',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
