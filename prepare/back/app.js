const express = require('express');
const app = express();
const db = require("./models");
const passportConfig = require("./passport");
const cors= require("cors");
const postRouter = require("./routes/post")
const postsRouter = require("./routes/posts")
const userRouter = require("./routes/user")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path =require("path");

dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log("db 연결 성공")
    })
    .catch(console.error);
passportConfig();
app.use(morgan("dev"));

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(cors({
    // origin: "https://nodebird.com",
    origin: "http://localhost:3060",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    saveUninitialized:false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
   res.send("hello express");
});

app.get("/api", (req, res) => {
   res.send("hello api");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

// 에러처리 미들웨어
// app.use((err, req, res, next) => {
//
// });

app.listen(3065, () => {
    console.log("서버 실행 중 ")
})

// npx sequelize db:create (ORM db 생성)