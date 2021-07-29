const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroceryItem = new Schema({
  groceryType: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
  },
  isRecursive: {
    type: Boolean,
  },
  placeOfOrigin: {
    type: String,
  },
  nameOfTheProduct: {
    type: String,
  },
  mrp: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  unitOfMesurment: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  isVariety: {
    type: Boolean,
    default: false,
  },
  varieties: {
    type: [],
    default: [],
  },
  varietyOf: {
    type: String,
  },
});

module.exports = mongoose.model("groceries", GroceryItem);
