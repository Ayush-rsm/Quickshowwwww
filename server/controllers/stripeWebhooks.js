// import stripe from "stripe"
// import Booking from "../models/Booking.js";
// import { response } from "express";
// import { data } from "react-router-dom";

// export const stripeWebhooks = async (request, response) => {
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//         event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`);
//     }
// }

// try {
//     switch (event.type) {
//         case "payment_intent.succeded": {
//             const paymentIntent = event.data.object;
//             const sessionList = await stripeInstance.checkout.session.list({
//                 payment_intent: paymentIntent.id
//             })

//             const session = sessionList.data[0];
//             const { bookingId } = session.metadata;

//             await Booking.findByIdAndUpdate(bookingId, {
//                 isPaid: true,
//                 paymentLink: ""
//             })

//             break;
//         }
        
//         // Send Confirmation Email

//         await inngest.send({
//           name: "app/show.booked",
//           data: {bookingId}
//         })
    
//         default:
//             console.log('Unhandled event type:', event.type)
//     }
//     response.json({received: true})
// } catch (error) {
//     console.error("Webhooks processing error:", error);
//     response.status(500).send("Interval Server Error");
// }

// // import Stripe from "stripe";
// // import Booking from "../models/Booking.js";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // export const stripeWebhooks = async (req, res) => {
// //   const sig = req.headers["stripe-signature"];

// //   let event;

// //   try {
// //     event = stripe.webhooks.constructEvent(
// //       req.body,
// //       sig,
// //       process.env.STRIPE_WEBHOOK_SECRET
// //     );
// //   } catch (error) {
// //     console.error("Webhook signature verification failed:", error.message);
// //     return res.status(400).send(`Webhook Error: ${error.message}`);
// //   }

// //   try {
// //     switch (event.type) {
// //       case "payment_intent.succeeded": {
// //         const paymentIntent = event.data.object;

// //         const sessions = await stripe.checkout.sessions.list({
// //           payment_intent: paymentIntent.id,
// //         });

// //         const session = sessions.data[0];
// //         if (!session) break;

// //         const { bookingId } = session.metadata;

// //         await Booking.findByIdAndUpdate(bookingId, {
// //           isPaid: true,
// //           paymentLink: "",
// //         });

// //         console.log("✅ Booking marked as paid:", bookingId);
// //         break;
// //       }

// //       default:
// //         console.log("Unhandled event type:", event.type);
// //     }

// //     res.json({ received: true });
// //   } catch (error) {
// //     console.error("Webhook processing error:", error);
// //     res.status(500).send("Internal Server Error");
// //   }
// // };

// // import Stripe from "stripe";
// // import Booking from "../models/Booking.js";

// // export const stripeWebhooks = async (req, res) => {

// //   console.log("🔥 Stripe webhook received");

// //   // ✅ Stripe is created AFTER dotenv has loaded
// //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);




// //   const sig = req.headers["stripe-signature"];
// //   let event;

// //   try {
// //     event = stripe.webhooks.constructEvent(
// //       req.body,
// //       sig,
// //       process.env.STRIPE_WEBHOOK_SECRET
// //     );

// //   } catch (err) {
// //     console.error("Webhook signature error:", err.message);
// //     return res.status(400).send(`Webhook Error: ${err.message}`);
// //   }

  
// //   console.log("🔥 Event type:", event.type); // 👈 HERE

// //   try {
// //     // 🚨 ALSO FIX THIS EVENT TYPE
// //     if (event.type === "checkout.session.completed") {
// //       const session = event.data.object;
// //       const bookingId = session.metadata?.bookingId;

// //       if (bookingId) {
// //         await Booking.findByIdAndUpdate(bookingId, {
// //           isPaid: true,
// //           paymentLink: "",
// //         });



// //         console.log("✅ Booking marked as paid:", bookingId);
// //       }
// //        else {
// //         console.log("❌ bookingId missing in metadata");
// //       }
// //     }

// //     res.json({ received: true });
// //   } catch (err) {
// //     console.error("Webhook processing error:", err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // };
import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).send("Stripe not configured");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        console.log("✅ Booking marked as paid:", bookingId);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    res.status(500).send("Internal Server Error");
  }
};
