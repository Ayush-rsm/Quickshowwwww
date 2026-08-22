import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRouter.js";
import stripeRouter from "./routes/stripeRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

// Stripe Webhooks Route
app.use('/api/stripe', stripeRouter);

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

// API Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

// Build a in-memory REST api for a url shortener.
//  You have 20 minutes. Use your preferred backend framework. 
//  No external database is needed. You can use curl or postman for testing the endpoints

const urlMap = new Map();

app.post("/shorten", (req, res) => {

  const data = req.body;
  const url = data.url;
  const shortKey = data.shortKey;

  if(!shortKey){
    return res.json({message: "Short key is not found"});
  }

  urlMap.set(shortKey, url);

  res.json({ url: `http://localhost:3000/${shortKey}`})


})

app.get("/:shortKey", (req, res) => {

  const key = req.params.shortKey;

  if(urlMap.get(key)){
    const url = urlMap.get(key);

    return res.redirect(url);
  }
  else{
    return res.json({ message: "Your key not found"})
  }

})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


