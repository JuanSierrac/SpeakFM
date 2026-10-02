import { loginGoogle, watchUser } from './auth.js';
import { saveStateCloud, loadStateCloud } from './cloud-state.js';
import { buyLives } from './payment.js';

window.saveStateCloud = saveStateCloud;
window.loadStateCloud = loadStateCloud;

function consumeCheckoutQuery() {
  const params = new URLSearchParams(location.search);
  const status = params.get('checkout');
  if (!status) return null;
  params.delete('checkout');
  const qs = params.toString();
  history.replaceState({}, '', location.pathname + (qs ? `?${qs}` : '') + location.hash);
  return status;
}

const checkoutStatus = consumeCheckoutQuery();
let checkoutToastDone = false;

watchUser(async (user) => {
  if (typeof window.syncCloudUser === 'function') {
    await window.syncCloudUser(user);
  }
  if (checkoutStatus === 'success') {
    window.grantPurchasedLives?.();
    if (!checkoutToastDone) {
      checkoutToastDone = true;
      window.showToast?.('Pago recibido. Vidas recargadas.');
    }
  } else if (checkoutStatus === 'cancel' && !checkoutToastDone) {
    checkoutToastDone = true;
    window.showToast?.('Pago cancelado');
  }
});

document.getElementById('btnLogin')?.addEventListener('click', async () => {
  try {
    await loginGoogle();
    window.showToast?.('Sesión iniciada');
  } catch (err) {
    if (err?.code !== 'auth/popup-closed-by-user') {
      window.showToast?.('Login fallido: ' + (err?.code || err?.message || 'error'));
      console.error(err);
    }
  }
});

document.getElementById('buyLivesBtn')?.addEventListener('click', async () => {
  try {
    await buyLives();
  } catch (err) {
    console.error(err);
    window.showToast?.('No se pudo abrir Stripe. Revisa Functions + claves.');
  }
});
