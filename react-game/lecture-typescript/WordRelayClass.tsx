import React, { Component, ChangeEvent, FormEvent } from 'react'

interface State {
    word: string,
    value: string,
    result: string,
}

// 클래스
class WordRelayClass extends Component<{}, State> {
    state = {
        word: '제로초',
        value: '',
        result: '',
    };

    onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: ''
            });
            if(this.input) {
                this.input.focus();
            }

        } else {
            this.setState({
                result: '땡',
                value: ''
            })
            if(this.input) {
                this.input.focus();
            }
        }
    };

    onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({value: e.target.value})
    };

    input: HTMLInputElement | null = null;

    onRefInput = (c: HTMLInputElement) => {
        this.input = c;
    };
    // onRefInput = createRef<HTMLInputElement>();
    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput}
                           value={this.state.value}
                           onChange={this.onChangeInput}
                           />
                    <button>입력!!!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

export default WordRelayClass;