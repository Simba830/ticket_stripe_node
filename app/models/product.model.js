const { v4: uuidv4 } = require('uuid');

module.exports = mongoose => {
  var product_schema = new mongoose.Schema(
    { 
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
      full_name: {
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
    },
    { timestamps: true }
  );

  product_schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", product_schema);
  return Product;
};