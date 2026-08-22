import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { safeSend } from "../inngest/index.js";

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

        await safeSend({
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
