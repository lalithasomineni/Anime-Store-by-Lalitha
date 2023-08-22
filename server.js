const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
const port = 4000;
const bodyParser = require("body-parser");
const userRoute = require("./routes/User");
const animeRoute = require("./routes/Anime");
const orderRoute = require("./routes/Order");
//const path = require('path');
const cors = require("cors"); // Import the cors package
const serveStatic = require("serve-static");

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from localhost:3000
app.use("/userroute", userRoute);
app.use("/animeroute", animeRoute);
app.use("/orderroute", orderRoute);

mongoose.connect("mongodb+srv://lsomineni:BkwscImDfeWce2yf@cluster0.ohqmh9l.mongodb.net/").then((result) => {
    console.log("connected to the db");
    app.listen(port, () => {
        console.log(`listening to local ${port}`);
    });
}).catch((err) => {
    console.log(err);
});
