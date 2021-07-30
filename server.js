const express = require("express");
const dbConnect = require("./server/db/dbConnect");
const groceriesApi = require("./server/routes/groceries.api");
const ordersApi = require("./server/routes/order.api");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//routes
app.use("/grocery", groceriesApi);
app.use("/order", ordersApi);

app.get("/", (req, res) => {
  res.status(200).send("YUP!");
});

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((e) => console.log(e));
