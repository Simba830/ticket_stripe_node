module.exports = mongoose => {
    var user_schema = mongoose.Schema(
      {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
      },
      { timestamps: true }
    );
  
    user_schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", user_schema);
    return User;
  };
  