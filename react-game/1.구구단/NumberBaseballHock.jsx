const React = require('react');
const TryHock = require('./TryHock')

const { memo, useState } = React;
// 자식 컴포넌트가 모두 퓨어컴포넌트나 memo를 사용하면 부모컴포넌트도 적용 가능

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i +=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseballHock = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}]
            })
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                setResult(`10번 넘게 돌려서 실패 답은 ${answer.join(',')}였습니다!`)
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]
                });
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {/* 즉시 실행함수 for문 예시 */}
                {/*{(() => {*/}
                {/*    const array = [];*/}
                {/*    for (let i = 0; i < tries.length; i++) {*/}
                {/*        array.push(<TryHock key={`${i + 1}차 시도 : `} tryInfo={tries[i]} index={i}/>)*/}
                {/*    }*/}
                {/*    return array;*/}
                {/*})()}*/}

                {/* 객체방식 */}
                {tries.map((item, index) => {
                    return (
                        <TryHock key={`${index + 1}차 시도 : `} tryInfo={item} index={index}/>
                    )
                })}
            </ul>
        </>
    );
});

module.exports = NumberBaseballHock;