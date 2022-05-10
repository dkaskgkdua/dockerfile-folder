const express = require("express");
const { User, Post } = require("../models")
const bcrypt = require("bcrypt");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares")
const router = express.Router();

router.get("/", async(req, res, next) => {
    console.log("headers", req.headers);
    try {
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                // attributes: ["id", "nickname", "email"],
                attributes: {
                    exclude: ["password"],
                },
                include: [{
                    model: Post,
                    attributes: ["id"]
                }, {
                    model: User,
                    as: "Followings",
                    attributes: ["id"]
                }, {
                    model: User,
                    as: "Followers",
                    attributes: ["id"]
                }]
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }

    } catch( error ) {
        console.error(error);
        next(error);
    }

});

// POST /user/login
router.post("/login", isNotLoggedIn,  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                // attributes: ["id", "nickname", "email"],
                attributes: {
                    exclude: ["password"],
                },
                include: [{
                    model: Post,
                    attributes: ["id"]
                }, {
                    model: User,
                    as: "Followings",
                    attributes: ["id"]
                }, {
                    model: User,
                    as: "Followers",
                    attributes: ["id"]
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        })
    })(req, res, next);
});

router.post("/",  isNotLoggedIn, async(req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if(exUser) {
            return res.status(403).send("이미 사용중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3060")
        res.status(201).send("ok");
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post("/logout", isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.send("ok");
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
           nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// PATCH /user/1/follow
router.patch("/:userId/follow", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send("유령을 팔로우하려고 하시네요?");
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
});
// DELETE /user/1/follow
router.delete("/:userId/follow", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send("유령을 언팔로우하려고 하시네요?");
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
});
// DELETE /user/follower/1
router.delete("/follower/:userId", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send("없는 사람을 차단하려고 하시네요?");
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({UserId: parseInt(req.params.userId, 10) });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// GET /user/followers
router.get("/followers", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send("없는 사람을 찾으려고 하시네요?");
        }
        const followers = await user.getFollowers();
        res.status(200).json(followers);
    } catch(error) {
        console.error(error);
        next(error);
    }
});
// GET /user/followings
router.get("/followings", isLoggedIn, async(req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send("없는 사람을 찾으려고 하시네요?");
        }
        const followings = await user.getFollowings();
        res.status(200).json(followings);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;