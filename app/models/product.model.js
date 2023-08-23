const { v4: uuidv4 } = require("uuid");

module.exports = (mongoose) => {
  var product_schema = new mongoose.Schema(
    {
      key_id: {
        type: Number,
        unique: true,
      },
      productId: {
        type: String,
        default: uuidv4,
        unique: true,
      },
      ordered: {
        type: Boolean,
        default: false,
      },
      email: {
        type: String,
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      profession: {
        type: String,
      },
      Company: {
        type: String,
      },
      state: {
        type: String,
      },
      priceId: {
        type: String,
      },
      sessionID: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  product_schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", product_schema);
  return Product;
};
