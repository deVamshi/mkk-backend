const express = require("express");
const GroceryItem = require("../MODELS/grocery_item.model");
const GroceryType = require("../MODELS/grocery_type.model");

const router = express.Router();

router.post("/addType", async (req, res) => {
  try {
    const { groceryTypeName, imgUrl, groceryItems } = req.body;
    if (groceryItems !== null && groceryItems.length > 0) {
      let groceryItemsToAdd = [];
      groceryItems.map((ele) => {
        groceryItemsToAdd.push(
          new GroceryItem({
            groceryType: groceryTypeName,
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
          })
        );
      });
      await GroceryItem.insertMany(groceryItemsToAdd, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    const typeExists = await GroceryType.exists({ groceryTypeName });
    if (typeExists) {
      return res.json({ msg: "Grocery Type exists" });
    } else {
      const newGroceryType = new GroceryType({ groceryTypeName, imgUrl });
      await newGroceryType.save();
      return res.json({ msg: "Grocery Type created" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.post("/addItem", async (req, res) => {
  const { groceryTypeName, listOfGroceryItems } = req.body;
  let updateGrocery;
  await newGroceryType.save((err) => {
    if (err) console.log(err);
  });
  return res.send("Successfully created a grocery type");
});

router.get("/fetchItems", async (req, res) => {
  const { groceryType } = req.body;
  try {
    const fetchedGroceryItems = await GroceryItem.find({
      groceryType: groceryType,
    }).exec();
    res.send({ data: [...fetchedGroceryItems], success: true });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
