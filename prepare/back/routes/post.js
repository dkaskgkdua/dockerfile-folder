const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        { id: 1, content: "hello"},
        { id: 2, content: "hello2"},
        { id: 3, content: "hello3"},
    ]);
});
router.post("/", (req, res) => {
    res.json([
        { id: 1, content: "hello"},
        { id: 2, content: "hello2"},
        { id: 3, content: "hello3"},
    ]);
});

module.exports = router;