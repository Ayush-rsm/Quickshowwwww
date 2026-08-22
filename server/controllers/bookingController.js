import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import stripe from 'stripe'

const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({ success: false, message: "Selected Seats are not available." });
    }

    const showData = await Show.findById(showId).populate('movie');

    const booking = await Booking.create({
      user: userId,       // ✅ userId IS the _id since your User model uses Clerk ID as _id
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats
    });

    // Seat Locking ho rahi hai
    selectedSeats.map((seat) => {  
      showData.occupiedSeats[seat] = userId;
    });

    // Nested object modify hua, Mongoose detect nahi karta -> To manually batana padta hai
    showData.markModified('occupiedSeats');
    await showData.save();

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // Stripe ko yeh format chahiye hota hai
    const line_items = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: showData.movie.title
        },
        unit_amount: Math.floor(booking.amount) * 100
      },
      quantity: 1
    }];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items,
      mode: 'payment',
      metadata: {
        bookingId: booking._id.toString()
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

//     session = {
//   id: "cs_test_a1b2c3",

//   object: "checkout.session",

//   url: "https://checkout.stripe.com/c/pay/cs_test_a1b2c3",

//   payment_status: "unpaid",

//   metadata: {
//     bookingId: "68782ab"
//   }
// }

    booking.paymentLink = session.url;
    await booking.save();

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};  // ✅ closing brace was missing here!

export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);

    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default { createBooking, getOccupiedSeats };