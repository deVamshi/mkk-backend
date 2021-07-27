const express = require("express");
const GroceryItem = require("../models/grocery_item.model");
const GroceryType = require("../models/grocery_type.model");

const router = express.Router();

router.post("/addType", async (req, res) => {
  try {
    const { groceryTypeName, imgUrl, groceryItems } = req.body;
    if (groceryItems !== null && groceryItems.length > 0) {
      let groceryItemsToAdd = [];

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
                imgUrl: variety.imgUrl,
                varieties: [],
                isVariety: true,
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
            varieties: ele.varieties,
          })
        );
      });

    // await GroceryItem.insertMany(groceryItemsToAdd, (err) => {
      //   if (err) {
      //     console.error(err);
      //   }
      // });
    }
    // const typeExists = await GroceryType.exists({ groceryTypeName });
    // if (typeExists) {
    //   return res.json({ msg: "Grocery Type exists" });
    // } else {
    //   const newGroceryType = new GroceryType({ groceryTypeName, imgUrl });
    //   await newGroceryType.save();
    //   return res.json({ msg: "Grocery Type created" });
    // }
    res.send();
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

router.get("/items", async (req, res) => {
  try {
    const groceryType = req.query.groceryType;
    const fetchedGroceryItems = await GroceryItem.find({
      groceryType: groceryType,
      isVariety: false,
    }).exec();
    res.json({ data: [...fetchedGroceryItems], success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
