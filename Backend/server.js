const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect('mongodb+srv://ToshanDB:Toshiba292003@testing.xazts.mongodb.net/Leetcode');

const UserScheme = mongoose.Schema({
    name: String,
    age: Number
});

const UserModel = mongoose.model("testing",UserScheme)

app.get("./getdata", (req, res) => {
    res.json(UserModel.find({}))
});

app.listen(3001, () => {
    console.log("Server is running.");
})