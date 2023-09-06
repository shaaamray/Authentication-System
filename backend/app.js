// express is use to handle funcs like logging, auth and error handling
const express = require('express');
// cors gives way to give access from anywhere to origin
const cors = require('cors');

//WXlPpHcivsIqURSq
// mongoose is used to connect your project with mongoDB
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");

// gives all the express functionality to the app
const app = express();

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(cookieParser()); // to handle the http only cookie; it can only be accessible from backend
app.use(express.json()); // to let the app know that json type is an expected type of data; otherwise it will show an error
app.use("/api", router);


mongoose.connect("mongodb+srv://admin:WXlPpHcivsIqURSq@cluster0.kimp85g.mongodb.net/auth-system?retryWrites=true&w=majority").then(() => {
    app.listen(5010);
    console.log("Database is connected! App is running through 5010");
}).catch((err) => {
    console.log(err);
})


