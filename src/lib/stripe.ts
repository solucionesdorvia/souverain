import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

export const stripe = key
  ? new Stripe(key, { apiVersion: "2025-02-24.acacia" })
  : null;

export function stripeRequired(): Stripe {
  if (!stripe) throw new Error("Stripe no está configurado: falta STRIPE_SECRET_KEY.");
  return stripe;
}
