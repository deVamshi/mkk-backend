const mongoose = require('mongoose');


const MONGOURI = "mongodb+srv://deVamshi:deVamshi@mkkcluster.ir5te.mongodb.net/mkkData?retryWrites=true&w=majority";


const dbConnect = async () => {
    try {
        let mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        const conn = await mongoose.connect(MONGOURI, mongooseOptions);
        console.log("Mongo DB connected " + conn.connection.host);
    } catch (e) {
        console.log(e);
        console.log("What the fuck");
    }
}


module.exports = dbConnect;