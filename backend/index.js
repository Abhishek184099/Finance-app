const express = require("express");
const cookieParser = require("cookie-parser");




const app = express();
require("dotenv").config({}); 
app.use(express.json());
app.use(cookieParser());


app.use("/api/", require("./routes/auth.route"));
app.use("/api/",require("./routes/transaction.route"))


app.listen(process.env.port || 0, () => {
    require("./db/connectDb").connectDb();
    console.log(`Listening to port ${process.env.port}`);
})