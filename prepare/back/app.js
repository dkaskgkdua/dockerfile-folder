const express = require('express');
const app = express();
const db = require("./models");
const passportConfig = require("./passport");
const cors= require("cors");
const postRouter = require("./routes/post")
const userRouter = require("./routes/user")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log("db 연결 성공")
    })
    .catch(console.error);
passportConfig();

app.use(cors({
    // origin: "https://nodebird.com",
    origin: "*",
    credentials: false,
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

app.listen(3065, () => {
    console.log("서버 실행 중 ")
})

// npx sequelize db:create (ORM db 생성)