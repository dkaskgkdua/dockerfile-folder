const express = require('express');
const redis = require("redis");

// 레디스 클라이언트 생성
const client = redis.createClient({
    host: 'redis-server',  // 도커환경이 아닌 일반환경은 https://도메인 형태로 가야한다
    prot: 6379
})

const PORT = 8090;

//APP
const app = express();
// 숫자는 0 부터 시작
client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        // 현재 숫자를 가져온 후에 1씩 올려줌
        client.set("number", parseInt(number) + 1)
        res.send("숫자가 1씩 올라갑니다. 숫자 : " + number);
    })
});

app.listen(PORT);
console.log("Server is running");