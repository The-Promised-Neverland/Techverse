import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import Stripe from "stripe";
import asyncHandler from "./middleware/asyncHandler.js";
import Order from "./models/orderModel.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret =
      "whsec_43c159b6c22e3c15bb7383eff7f098c1dda8f0e4a99b758d39f499b792518d6f";

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Verified Webhook");
    } catch (err) {
      console.log("FAILED", err);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        const paymentIntent = session.payment_intent;

        const paymentStatus = paymentIntent.status;
        const paymentTime = new Date(paymentIntent.created); // Convert Unix timestamp to JavaScript Date object
        const paymentEmail = session.customer_details.email;
        const paymentId = paymentIntent.id;
        const orderID = session.client_reference_id;

        const order = await Order.findById(orderID);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            // from payment gateways like stripe/paypal etc
            id: paymentId, // transaction id
            status: paymentStatus, // payment status
            update_time: paymentTime, // payment success time
            email_address: paymentEmail, // email address of payee
          };
          try {
            await order.save();
          } catch (error) {
            res.status(400).send("Order Not Found!");
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // console.log({ EVENT_TYPE: event.type });
    // console.log({ EVENT_DATA_OBJECT: event.data.object });
    // console.log({ EVENT_DATA_OBJECT_ID: event.data.object.id });
    res.json({ message: true });
  }
);

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use('/api/upload', uploadRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.post(
  "/api/create-checkout-session/stripe",
  asyncHandler(async (req, res) => {
    const { orderItems, URL, orderID } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: orderItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${URL}?status=success`,
      cancel_url: `${URL}?status=failed`,
      client_reference_id: orderID,
    });

    res.send({ url: session.url });
  })
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running ....");
  });
}

app.use(notFound);
app.use(errorHandler);


app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
  )
);
