const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));


app.get("/", (req, res) => {
    res.send("hi");
});

app.get("/api/test", (req, res) => {
    console.log(req.body);
    res.json(true);
});

app.post("/api/blog", (req, res) => {
    console.log(req.body);
    blogPosts.push(req.body);
    res.json(blogPosts);
});
// This is a catch all if no other routes are matched
app.use(function(req,res) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})