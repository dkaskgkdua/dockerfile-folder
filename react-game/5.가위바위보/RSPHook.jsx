const React = require('react');
const { useState, useRef, useEffect } = React;

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위)
    const [score, setScore] = useState(0);
    const interval = useRef();
    /**
     * useEffect에 아래처럼 여러개 사용가능
     * useEffect(() => { setResult(); setImgCoord()},[result, imgCoord]);
     * useEffect(() => { setScore(); },[score]);
     * */
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1은 아님)
        interval.current = setInterval(changeHand, 1000);
        return () => { // componentWillUnmount 역할할
            clearInterval(interval.current);
       }
    }, [imgCoord]);
    // deps의 경우 렌더링 이후 state의 값을 계속 일치해야할 경우(계속 관리 필요한 경우 배열에 state를 넣어줌)
    // 한마디로 없으면 componentDidMount, 있으면 componentDidUpdate

    const changeHand = () => {
        if(imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위)
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    const onClickBtn = (choice) => (e) => { // 고차함수
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0) {
            setResult('비겼습니다.')
        } else if([-1, 2].includes(diff)) {
            setResult('이겼습니다.!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 1000);
        }, 1000);

    }

    return (
        <>
            <div
                id="computer"
                style={{ background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}
            >
            </div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
}

module.exports = RSP;