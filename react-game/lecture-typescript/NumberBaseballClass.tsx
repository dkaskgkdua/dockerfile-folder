import React, {Component, createRef, FormEvent, useRef, useCallback, ChangeEvent} from 'react';
import Try from './Try' ;
import {TryInfo} from "./types";

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i +=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

interface State {
    result: string;
    value: string;
    answer: number[];
    tries: TryInfo[];
}

class NumberBaseball extends Component<{}, State> {
    state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries : []
    };
    onSubmitForm = (e: FormEvent) => {
        const  { value, tries, answer } = this.state;
        e.preventDefault();
        const input = this.inputRef.current;

        if(value === answer.join('')) {
            this.setState((prevState) =>{
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result: '홈런!'}],
                }
            })
            if(input) {
                input.focus();
            }

        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) {
                this.setState((prevState) => {
                    return {
                        result: `10번 넘게 돌려서 실패 답은 ${prevState.answer.join(',')}였습니다!`,
                    }
                });
                alert('게임을 다시 시작합니다.');
                this.setState((prevState) => {
                    return {
                        value: '',
                        answer: getNumbers(),
                        tries: [],
                    }
                })
                if(input) {
                    input.focus();
                }
                // this.inputRef.focus();
            } else {
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: prevState.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    }
                })
                if(input) {
                    input.focus();
                }
            }
        }
    };

    onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.target.value,
        })
    };

    inputRef = createRef<HTMLInputElement>();

    render() {
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {/* 객체방식 */}
                    {tries.map((item, index) => {
                        return (
                            <Try key={`${index + 1}차 시도 : `} tryInfo={item} />
                        )
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;