const React = require('react');
const { useState, useRef, useEffect, useMemo, useCallback } = React;
const Ball = require('./Ball')

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber]
}

const Lotto = () => {
    // 성능최적화를 위해 getWinNumbers에 useMemo를 사용해 매번 랜더링시 호출 안함
    // useMemo : 복잡한 함수 결괏값을 기억, useRef : 일반 값을 기억
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    // componentDidUpdate에서만, componentDidMount X
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else {
            // ajax
        }
    }, [
        // 바뀌는 값
    ])

    useEffect(() => {
        console.log('useEffect1');
        for(let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000)
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current]) // 빈 배열이면 componentDidMount와 동일
    // 배열에 조건이나 요소가 있으면 ComponentDidMount와 DidUpdate 수행



    // useCallback : useMemo 처럼 함수를 기억해놓음 이후 렌더링 시 새로 생성 안함
    // useCallback 경우 이전값을 기억하는데 2번째 인자값으로 배열 안에 state값을 넣으면 감지함
    const onClickRedo = useCallback(() => {
        console.log(winNumbers)
        setWinNumbers(getWinNumbers);
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    )
}

module.exports = Lotto;