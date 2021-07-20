const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroceryType = new Schema(
  {
    groceryTypeName: {
      type: String,
      required: true,
    },
    imgUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("groceryType", GroceryType);
