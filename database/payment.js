import { httpsCallable } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-functions.js';
import { auth, functions } from './firebase.js';

export async function buyLives() {
  if (!auth.currentUser) {
    window.showToast?.('Entra con Google primero');
    return;
  }

  const checkout = httpsCallable(functions, 'createCheckoutSession');
  const result = await checkout({ origin: location.origin + location.pathname });

  if (!result.data?.url) {
    throw new Error('Checkout sin URL');
  }
  location.href = result.data.url;
}
