import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { auth } from './firebase.js';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export async function loginGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export function watchUser(cb) {
  return onAuthStateChanged(auth, cb);
}
