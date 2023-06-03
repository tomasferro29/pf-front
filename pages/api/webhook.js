import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_b92c01d3bb8f5867b5083afb637d66e38718b276f64760afcb3b4ba065a89bab";

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

export const config = {
  api: {bodyParser:false,}
}

// poise-loves-lush-steady