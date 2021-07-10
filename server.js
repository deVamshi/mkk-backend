const express = require('express');
const dbConnect = require('./server/DB/dbConnect');
const groceriesApi = require('./server/ROUTES/groceries.api')


dbConnect();

const app = express();

const PORT = process.env.PORT || 5000;



app.use(express.json())

app.use('/groceries', groceriesApi);

app.get('/', (req, res) => {
    res.status(200).send("Hello world");
})


app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
})


