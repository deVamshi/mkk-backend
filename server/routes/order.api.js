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

    const createdOrder = await Order.findOneAndUpdate(
      {
        userId: phoneNumber,
        dd: new Date().toISOString().slice(0, 10),
      },
      {
        userId: phoneNumber,
        dd: new Date().toISOString().slice(0, 10),
        ringBell,
        address,
        products: productMap,
      },
      { new: true }
    ).lean();
    res.send(createdOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
});

router.get("/fetch", async (req, res) => {
  const { date, phoneNumber } = req.query;
  const isAdmin = req.get("isAdmin");

  let listOfProducts = [];
  let orderData;
  try {
    if (isAdmin) {
      orderData = await Order.find({ dd: date });
    } else {
      orderData = await Order.findOne({ dd: date, userId: phoneNumber });
    }
    if (orderData != null) {
      for await (let order of orderData) {
        for await (let product of order["products"]) {
          let item = await GroceryItem.findById(product["productId"]).lean();
          listOfProducts.push(item);
        }
      }
    }
    return res.json({
      data: {
        orderData: orderData == null ? [] : orderData,
        listOfProducts: listOfProducts,
      },
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Sever Error");
  }
});

module.exports = router;
