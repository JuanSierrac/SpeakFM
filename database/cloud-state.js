import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';
import { db } from './firebase.js';

export async function saveStateCloud(uid, state) {
  if (!uid) return;
  await setDoc(doc(db, 'users', uid), state, { merge: true });
}

export async function loadStateCloud(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}
