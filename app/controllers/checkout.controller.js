require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../models");
const Product = db.products;

// Checkout function
exports.checkout = async (req, res) => {
  const { amount, description, email, productItems, quantity, first_name, last_name, profession, company } = req.body;

  if (quantity > 2) {
    return res.status(400).json({ message: "Maximum quantity exceeded" });
  }
  try {


    const price = await stripe.prices.create({
      unit_amount: amount*100*quantity,
      currency: 'usd',
      product: process.env.PRODUCT_ID,
    });
    // Perform necessary operations for checkout, such as calculating total price and creating Stripe payment intent
    const session = await stripe.checkout.sessions.create({
      // For each item use the id to get it's information
      // Take that information and convert it to Stripe's format
      customer_email: email,
      line_items: [
        {price: price.id, quantity: 1},
      ],
      mode: "payment",
      // Set a success and cancel URL we will send customers to
      // These must be full URLs
      // In the next section we will setup CLIENT_URL
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    productItems.map(async (item, index) => {
      await Product.updateOne(
        { productId: item },
        {
          state: "pending",
          priceId: price.id,
          email: email,
          first_name: first_name, 
          last_name: last_name,
          profession: profession,
          company: company
        }
      );
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error during checkout: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
