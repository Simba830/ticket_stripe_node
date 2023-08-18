const products = require("../controllers/product.controller.js");

var router = require("express").Router();

// Create a new Product

const authMiddleware = require("../middleware/authmiddleware.js");
router.post("/create", authMiddleware, products.create);

// Retrieve all products
router.get("/", authMiddleware, products.findAll);

// Retrieve all ordered products
router.get("/ordered_tickets", authMiddleware, products.findAllOrdered);

router.get("/remain_tickets", authMiddleware, products.findAllRemainingTickets);

// Retrieve a single Product with id
router.get("/:id", authMiddleware, products.findOne);

// Update a Product with id
router.put("/:id", authMiddleware, products.update);

// Delete a Product with id

router.delete("/:id", authMiddleware, products.delete);

// Create a new Product
router.delete("/", authMiddleware, products.deleteAll);

module.exports = router;
