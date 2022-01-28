import React, {memo, useState, ChangeEvent, FormEvent, useRef, useCallback} from 'react';
import Try from './Try' ;
import {TryInfo} from "./types";
// 자식 컴포넌트가 모두 퓨어컴포넌트나 memo를 사용하면 부모컴포넌트도 적용 가능

const getNumbers = () => {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i +=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};



const NumberBaseball = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState<TryInfo[]>([]);
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback<(e: FormEvent) => void>((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if(value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}]
            })
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            if(input) {
                input.focus();
            }
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
                if(input) {
                    input.focus();
                }
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
                if(input) {
                    input.focus();
                }
            }
        }
    },  [value, answer]);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                    onChange={onChangeInput}/>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((item, index) => {
                    return (
                        <Try key={`${index + 1}차 시도 : `} tryInfo={item} />
                    )
                })}
            </ul>
        </>
    );
});

export default NumberBaseball;