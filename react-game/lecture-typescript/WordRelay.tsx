import React, {Component, ChangeEvent, FormEvent, useCallback, useRef, useState} from 'react'

const WordRelay = () => {
    const [word, setWord] = useState('송민준')
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = useCallback<(e: FormEvent) => void>((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if(word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            if(input) {
                input.focus();
            }

        } else {
            setResult('땡');
            setValue('');
            if(input) {
                input.focus();
            }
        }
    }, [word, value]);

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }, []);

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input id="wordInput"
                       ref={inputEl}
                       value={value}
                       className = "class-test"
                       onChange={onChangeInput}
                       />
                <button>입력!!!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

export default WordRelay;