const express = require("express");
const GroceryItem = require("../models/grocery_item.model");
const GroceryType = require("../models/grocery_type.model");

const router = express.Router();

router.post("/addType", async (req, res) => {
  try {
    const { groceryTypeName, imgUrl, groceryItems } = req.body;
    if (groceryItems !== null && groceryItems.length > 0) {
      let groceryItemsToAdd = [];

      const typeExists = await GroceryType.exists({ groceryTypeName });
      if (typeExists) {
        return res.status(400).json({ msg: "Grocery Type exists" });
      } else {
        groceryItems.map((ele) => {
          if (ele.varieties !== null && ele.varieties.length > 0) {
            ele.varieties.map((variety) => {
              groceryItemsToAdd.push(
                new GroceryItem({
                  groceryType: groceryTypeName,
                  isInStock: variety.isInStock,
                  isRecursive: variety.isRecursive,
                  placeOfOrigin: variety.placeOfOrigin,
                  nameOfTheProduct: variety.nameOfTheProduct,
                  mrp: variety.mrp,
                  sellingPrice: variety.sellingPrice,
                  quantity: variety.quantity,
                  unitOfMesurment: variety.unitOfMesurment,
                  imgUrl: variety.imgUrl == null ? ele.imgUrl : variety.imgUrl,
                  varieties: [],
                  isVariety: true,
                  varietyOf: ele.nameOfTheProduct,
                })
              );
            });
          }
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
              varieties: [],
            })
          );
        });
        await GroceryItem.insertMany(groceryItemsToAdd, (err) => {
          if (err) {
            console.error(err);
          }
        });
        const newGroceryType = new GroceryType({ groceryTypeName, imgUrl });
        await newGroceryType.save();
        return res.json({ msg: "Grocery Type exists" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// router.post("/addItem", async (req, res) => {
//   const { groceryTypeName, listOfGroceryItems } = req.body;
//   let updateGrocery;
//   await newGroceryType.save((err) => {
//     if (err) console.log(err);
//   });
//   return res.send("Successfully created a grocery type");
// });

router.get("/items", async (req, res) => {
  try {
    const groceryType = req.query.groceryType;
    const fetchedGroceryItems = await GroceryItem.find({
      groceryType: groceryType,
      isVariety: false,
    }).lean();
    res.json({ data: [...fetchedGroceryItems], success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/items-variety", async (req, res) => {
  try {
    const varietyOf = req.query.varietyOf;
    const fetchedGroceryItems = await GroceryItem.find({
      varietyOf: varietyOf,
      isVariety: true,
    }).lean();
    res.json({ data: [...fetchedGroceryItems], success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
