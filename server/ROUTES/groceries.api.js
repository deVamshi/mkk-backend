const express = require("express");
const GroceryItem = require("../MODELS/grocery_item");
const GroceryType = require("../MODELS/grocery_type.model");

const router = express.Router();

router.post("/addGroceryType", async (req, res) => {
  const { groceryTypeName, groceryItems } = req.body;

  let groceryItemsToAdd = [];

  if (groceryItems !== null && groceryItems.length > 0) {
    groceryItems.map((ele) => {
      groceryItemsToAdd.push({
        isInStock: ele.isInStock,
        isRecursive: ele.isRecursive,
        placeOfOrigin: ele.placeOfOrigin,
        nameOfTheProduct: ele.nameOfTheProduct,
        mrp: ele.mrp,
        sellingPrice: ele.sellingPrice,
        quantity: ele.quantity,
        unitOfMesurment: ele.unitOfMesurment,
        imgUrl: ele.imgUrl,
        varieties: ele.varieties,
      });
    });
  }

  let newGroceryType = new GroceryType({
    groceryTypeName,
    groceryItems: groceryItemsToAdd,
  });

  await newGroceryType.save((err) => {
    if (err) console.log(err);
  });
  return res.json({ "Item Added": newGroceryType });
});

router.post("/addGroceryItem", async (req, res) => {
  const { groceryTypeName, listOfGroceryItems } = req.body;

  let updateGrocery;

  await newGroceryType.save((err) => {
    if (err) console.log(err);
  });
  return res.send("Successfully created a grocery type");
});

router.get("/", (req, res) => {
  // res.send("This actually worked dude");
});

module.exports = router;
