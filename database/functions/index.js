const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();

const stripeSecret = defineSecret('STRIPE_SECRET_KEY');
const webhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

exports.createCheckoutSession = onCall(
  { secrets: [stripeSecret], region: 'us-central1', cors: true, invoker: 'public' },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError('unauthenticated', 'Login required');
    }

    const stripe = new Stripe(stripeSecret.value());
    const origin = String(request.data?.origin || '').replace(/\/$/, '') || 'http://localhost:5000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      client_reference_id: request.auth.uid,
      metadata: { uid: request.auth.uid },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: 199,
            product_data: { name: 'Speak FM — recarga de 3 vidas' },
          },
        },
      ],
      success_url: `${origin}?checkout=success`,
      cancel_url: `${origin}?checkout=cancel`,
    });

    return { url: session.url };
  }
);

exports.stripeWebhook = onRequest(
  { secrets: [stripeSecret, webhookSecret], region: 'us-central1', invoker: 'public', cors: false },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const stripe = new Stripe(stripeSecret.value());
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret.value());
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const uid = event.data.object.metadata?.uid || event.data.object.client_reference_id;
      if (uid) {
        await admin.firestore().doc(`users/${uid}`).set(
          { lives: 3, livesRestoreAt: null },
          { merge: true }
        );
      }
    }

    res.json({ received: true });
  }
);
