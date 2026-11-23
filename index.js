const express = require('express');
const cookieParser = require('cookie-parser');
const { connectMongoDB } = require('./connection');
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth") 

const PORT = 3000;
const url = 'mongodb://127.0.0.1:27017/short-url';
const app = express();
const URL = require("./models/url")
const path = require("path");

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
connectMongoDB(url).then(() => {
    console.log("Mongo db connected")
}).catch((err) => {
    console.error('MongoDb connection failed : ', err);
})

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", checkAuth, userRoute);     
app.use("/", staticRoute);

app.get("/test", async(req, res) => {
    const allUrls = await URL.find({});
    res.render('home', {
        urls: allUrls
    });
})

app.listen(PORT, (err, data) => {
    if(err) {
        console.log("Error in starting server", err);
        return;
    }
    console.log(`Server started running on port : ${PORT}`);
});