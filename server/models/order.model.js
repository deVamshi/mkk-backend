const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: { type: Map, required: true },
  address: { type: String, required: true },
  ringBell: { type: Boolean, required: false, default: true },
  dd: { type: String, required: true },
  userId: { type: Number, required: true },
});

module.exports = mongoose.model("orders", OrderSchema);
