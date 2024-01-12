const express = require("express");
const mongoose = require('mongoose')

const app = express();

// conenction to mongodb
mongoose.connect("mongodb://localhost/todo_express", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.listen(3000, () => console.log("Server started now on port: 3000"));