const express = require("express");
const Order = require("../models/order.model");

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

    res.send(placedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
});

router.get("/fetch", async (req, res) => {
  const { date, isAdmin, phoneNumber } = req.query;
  try {
    if (isAdmin != null && isAdmin != false) {
      const orderData = await Order.find({ dd: date });
      return res.json({ orderData: orderData });
    } else {
      const orderData = await Order.findOne({ dd: date, userId: phoneNumber });
      return res.json({ orderData: orderData == null ? [] : orderData });
    }
  } catch (err) {
    res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
