const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const Product = db.products;

// Create and Save a new Product
exports.create = (req, res) => {
  const { key_id } = req.body;
  console.log(key_id);
  // Validate request
  if (!key_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Product
  let uuid = uuidv4();
  console.log(uuid);
  Product.updateOne(
    { key_id: { $in: key_id } },
    {
      $set: {
        productId: uuid,
        isDeleted: false,
        email: "",
        ordered: false,
        first_name: "",
        last_name: "",
        profession: "",
        company: "",
        priceID: "",
        sessionID: "",
        state: "",
      },
    },
    { upsert: true, new: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.add = (req, res) => {
  const { idsToAdd } = req.body;
  console.log(idsToAdd);
  const uuid = uuidv4();
  Product.updateMany(
    { key_id: { $in: idsToAdd } },
    {
      $set: {
        productId: uuid,
        isDeleted: false,
        email: "",
        ordered: false,
        first_name: "",
        last_name: "",
        profession: "",
        company: "",
        priceID: "",
        sessionID: "",
        state: "",
      },
    },
    { upsert: true, new: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.findDeleted = (req, res) => {
  Product.find({ isDeleted: true })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  // const id = req.query.id;
  // var condition = id
  //   ? { id: { $regex: new RegExp(id), $options: "i" } }
  //   : { isDeleted: false };

  // Product.find(condition)
  Product.find({ isDeleted: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findOne({ key_id: id })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Product.findOneAndUpdate({ key_id: id }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  Product.updateOne({ key_id: id }, { $set: { isDeleted: true } })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.updateMany({ $set: { isDeleted: true } })
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products.",
      });
    });
};

// Find all ordered Products
exports.findAllOrdered = (req, res) => {
  Product.find({ ordered: true, isDeleted: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while ordered products.",
      });
    });
};

exports.findAllRemainingTickets = (req, res) => {
  Product.find({ ordered: false, isDeleted: false })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while remaining products.",
      });
    });
};
