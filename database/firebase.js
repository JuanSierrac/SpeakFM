import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { getFunctions } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-functions.js';
import { firebaseConfig, FUNCTIONS_REGION } from './config.js';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, FUNCTIONS_REGION);
