require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../models");
const Product = db.products;
const sgMail = require("@sendgrid/mail");

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  console.log('object');
  const msg = {
    to: to,
    from: "hantarialexandru@gmail.com", // Replace with your email
    subject: subject,
    html: `<strong>${text}</strong>`,
  };
  console.log('msg:', msg);

  try {
    await sgMail.send(msg).then((res) => {console.log('res:', res);});
    console.log(`Email sent successfully to the ${to}`);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

// Checkout function
exports.checkout = async (req, res) => {
  const {
    amount,
    email,
    productItems,
    first_name,
    last_name,
    profession,
    company,
  } = req.body;

  const items_count = productItems ? productItems.length : 0;
  console.log(items_count);
  if (items_count > 2) {
    return res.status(400).json({ message: "Maximum count of items exceeded" });
  }
  try {
    const price = await stripe.prices.create({
      unit_amount: amount * 100 * items_count,
      currency: "usd",
      product: process.env.PRODUCT_ID,
    });
    // Perform necessary operations for checkout, such as calculating total price and creating Stripe payment intent
    const session = await stripe.checkout.sessions.create({
      // For each item use the id to get it's information
      // Take that information and convert it to Stripe's format
      customer_email: email,
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "payment",
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    // productItems.map(async (item, index) => {
    //   await Product.updateOne(
    //     { productId: item },
    //     {
    //       state: "pending",
    //       priceId: price.id,
    //       email: email,
    //       first_name: first_name,
    //       last_name: last_name,
    //       profession: profession,
    //       company: company,
    //     }
    //   );
    // });

    // const recipient_email = email;
    // const subject = "Payment Success";
    // const text = "Your payment was successful. Thank you!";
    // await sendEmail(recipient_email, subject, text);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error during checkout: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.webhook = async (req, res) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

// productItems.map(async (item, index) => {
//   await Product.updateOne(
//     { productId: item },
//     {
//       state: "success",
//       ordered: true,
//     }
//   );
// });

// // Send an email using SendGrid
// const email = session.customer_email;
// const subject = "Payment Success";
// const text = "Your payment was successful. Thank you!";
// await sendEmail(email, subject, text);
