const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroceryItem = require("./grocery_item");

const GroceryType = new Schema(
  {
    groceryItems: {
      type: [GroceryItem],
    },
    groceryTypeName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("groceryType", GroceryType);
