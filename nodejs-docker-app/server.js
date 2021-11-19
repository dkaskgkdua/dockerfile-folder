const express = require('express');

const PORT = 8088;

//APP
const app = express();
app.get('/', (req, res) => {
    res.send("안녕하세요222321321")
});

app.listen(PORT);
console.log("Server is running");