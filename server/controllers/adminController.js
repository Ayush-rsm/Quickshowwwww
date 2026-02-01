import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";


// API to check if user is admin
import { clerkClient } from "@clerk/express";

export const isAdmin = async (req, res) => {
  try {
    const { userId } = req.auth(); // ✅ correct (new Clerk API)
    const user = await clerkClient.users.getUser(userId);

    console.log("USER ID:", userId);
    console.log("PRIVATE METADATA:", user.privateMetadata);

    const isAdmin = user.privateMetadata?.role === "admin";

    res.json({ success: true, isAdmin });
  } catch (error) {
    console.error("IS ADMIN ERROR:", error);
    res.status(403).json({ success: false, isAdmin: false });
  }
};



// API to get dashboard data
// export const getDashboardData = async (req, res) => {
//     try {
//         const bookings = await Booking.find({ isPaid: true });

//         const activeShows = await Show.find({
//             showDateTime: { $gte: new Date() },
//         }).populate("movie");

//         const totalUser = await User.countDocuments();

//         const dashboardData = {
//             totalBookings: bookings.length,
//             totalRevenue: bookings.reduce(
//                 (acc, booking) => acc + booking.amount,
//                 0
//             ),
//             activeShows,
//             totalUser,
//         };

//         res.json({ success: true, dashboardData });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });

//     }
// };
export const getDashboardData = async (req, res) => {
  try {
    const allShows = await Show.find();
    console.log("TOTAL SHOWS IN DB:", allShows.length);

    const activeShows = await Show.find().populate("movie");
    console.log("ACTIVE SHOWS SENT:", activeShows.length);

    res.json({
      success: true,
      dashboardData: {
        totalBookings: 0,
        totalRevenue: 0,
        activeShows,
        totalUser: 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// API to get all shows
// export const getAllShows = async (req, res) => {
//     try {
//         const shows = await Show.find({
//             showDateTime: { $gte: new Date() },
//         })
//             .populate("movie")
//             .sort({ showDateTime: 1 });

//         res.json({ success: true, shows });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error("getAllShows error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// API to get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate("user")
            .populate({
                path: "show",
                populate: { path: "movie" },
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
