import express from "express";
import { stripeWebhooks } from "../controllers/stripeWebhooks.js";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

export default router;
