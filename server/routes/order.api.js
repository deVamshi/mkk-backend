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

    const orderExists = await Order.exists({
      userId: phoneNumber,
      dd: new Date().toISOString().slice(0, 10),
    });
    let createdOrder;
    if (orderExists) {
      createdOrder = await Order.findOneAndUpdate(
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
    } else {
      createdOrder = await Order.create({
        userId: phoneNumber,
        dd: new Date().toISOString().slice(0, 10),
        ringBell,
        address,
        products: productMap,
      });
    }

    res.send(createdOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
});

router.get("/fetch", async (req, res) => {
  let { date, phoneNumber } = req.query;
  const isAdmin = req.get("isAdmin");

  if (date == null) {
    date = new Date().toISOString().slice(0, 10);
  }

  let listOfProducts = [];
  let adminOrders;
  let userOrder;
  try {
    if (isAdmin) {
      adminOrders = await Order.find({
        dd: new Date().toISOString().slice(0, 10),
      });
      if (adminOrders != null) {
        for await (let order of adminOrders) {
          for await (let product of order["products"]) {
            let item = await GroceryItem.findById(product["productId"]).lean();
            listOfProducts.push(item);
          }
        }
      } else {
        adminOrders = [];
      }
    } else {
      userOrder = await Order.findOne({ dd: date, userId: phoneNumber }).lean();
      if (userOrder != null) {
        for await (let product of userOrder["products"]) {
          let item = await GroceryItem.findById(product["productId"]).lean();
          listOfProducts.push(item);
        }
      }
    }

    return res.json({
      data: {
        orderData: isAdmin ? adminOrders : userOrder == null ? [] : [userOrder],
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
