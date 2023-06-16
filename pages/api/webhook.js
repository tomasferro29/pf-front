import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import axios from "axios";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret = process.env.ENPOINT_SECRET

export default async function handler(req, res) {
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
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
        // console.log(data.metadata)
        const order = await Order.findById(orderId);
        order.line_items.forEach(async (li) => {
          // console.log(li)
            const quantity= li.quantity;
            const productId= li.price_data.product_data.productId;
            const product = await Product.findById(productId);
            // console.log(product)  
            const nstock =product.stock-quantity
            if(nstock<0){
              //sent message 
            }else{
            await Product.findByIdAndUpdate(productId, {
                stock: nstock
            }).catch(err=>{
              console.log(err)
            })
          }
        });
      }
      //sent message

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')

}

export const config = {
  api: { bodyParser: false, }
}

// poise-loves-lush-steady