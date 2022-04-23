const express = require('express');
const app = express();
const postRouter = require("./routes/post")

app.get("/", (req, res) => {
   res.send("hello express");
});

app.get("/api", (req, res) => {
   res.send("hello api");
});

app.use("/post", postRouter);

app.listen(3065, () => {
    console.log("서버 실행 중 ")
})