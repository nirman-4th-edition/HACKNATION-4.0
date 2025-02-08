import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Ensure it's a number
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success", // Redirect to success page
      cancel_url: "http://localhost:5173/marketplace",
    });

    res.json({ url: session.url }); // Return session URL
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
