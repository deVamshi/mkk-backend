const express = require("express");
const Order = require("../models/order.model");
const GroceryItem = require("../models/grocery_item.model");

const router = express.Router();

router.post("/create", async (req, res) => {
  const { phoneNumber, products, address, ringBell } = req.body;
  let productMap = [];
  try {
    Object.keys(products).forEach((key) => {
      productMap.push({ productId: key, quantity: products[key] });
    });

    let orderExists = await Order.exists({
      userId: phoneNumber,
      dd: new Date().toISOString().slice(0, 10),
    });
    if (orderExists) {
      const updatedOrder = await Order.findOneAndUpdate({
        ringBell,
        address,
        products: productMap,
      });
      return res.send(updatedOrder);
    } else {
      let content = {
        dd: new Date().toISOString().slice(0, 10),
        products: productMap,
        userId: phoneNumber,
        address: address,
        ringBell,
      };
      const placedOrder = await Order.create(content);
      return res.send(placedOrder);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
});

router.get("/fetch", async (req, res) => {
  const { date, isAdmin, phoneNumber } = req.query;
  let productIds = [];
  let actualProducts = [];
  try {
    if (isAdmin) {
      const orderData = await Order.find({ dd: date });

      if (orderData != null) {
        for await (let order of orderData) {
          for await (let product of order["products"]) {
            let item = await GroceryItem.findById(product["productId"]).exec();
            actualProducts.push(item);
          }
        }
      }
      return res.json({
        orderData: orderData == null ? [] : orderData,
        listOfProducts: actualProducts,
      });
    } else {
      const orderData = await Order.findOne({ dd: date, userId: phoneNumber });
      return res.json({ orderData: orderData == null ? [] : orderData });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
