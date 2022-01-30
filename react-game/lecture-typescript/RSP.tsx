import React, {useState, useRef, useEffect} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
} as const;

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
} as const;

// type ImgCoords = '0' | '-142px' | '-284px';
// type ImgCoordsKey = keyof typeof rspCoords; // 키 타입으로 뽑기
type ImgCoords = typeof rspCoords[keyof typeof rspCoords];
type ImgCoordsKey = keyof typeof rspCoords;
const computerChoice = (imgCoord: ImgCoords) => {
    return (Object.keys(rspCoords) as ['바위', '가위', '보']).find((v) => {
        return rspCoords[v] === imgCoord;
    })!; // undefined가 안나온다는 확신으로 !를 주거나 if로 검증처리
}

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.바위)
    const [score, setScore] = useState(0);
    const interval = useRef<number>();
    /**
     * useEffect에 아래처럼 여러개 사용가능
     * useEffect(() => { setResult(); setImgCoord()},[result, imgCoord]);
     * useEffect(() => { setScore(); },[score]);
     * */
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1은 아님)
        interval.current = window.setInterval(changeHand, 1000);
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

    const onClickBtn = (choice: ImgCoordsKey) => () => { // 고차함수
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
            interval.current = window.setInterval(changeHand, 1000);
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

export default RSP;