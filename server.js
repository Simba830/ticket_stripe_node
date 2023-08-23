const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
require("dotenv").config();
// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// const product_router = require("./app/routes/product.routes");
const router = require("./app/routes/index");
// Moved this line before using the router
app.use("/api", router);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
