const express = require("express");
const router = express.Router();
const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares")

router.get("/", (req, res, next) => {
    res.json([
        { id: 1, content: "hello"},
        { id: 2, content: "hello2"},
        { id: 3, content: "hello3"},
    ]);
});
router.post("/",  isLoggedIn, async (req, res, next) => {
    try {
        // passport에서 구현한 것으로 user에 접근이 가능함
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ["id", "nickname"],
                }]
            }, {
                model: User,
                attributes: ["id", "nickname"],
            }]
        })

        res.status(201).json(fullPost);
    } catch( error ) {
        console.error(error);
        next(error);
    }
});
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        })
        if(!post) {
            return res.status(403).send("존재하지 않는 게시글입니다.");
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        });
        const fullComment = await Comment.findOne({
            where: { id : comment.id },
            include: [{
                model: User,
                attributes: ["id", "nickname"],
            }]
        })
        res.status(201).json(fullComment);
    } catch( error ) {
        console.error(error);
        next(error);
    }
});



module.exports = router;