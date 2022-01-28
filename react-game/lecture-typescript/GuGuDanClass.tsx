import React, {Component, FormEvent, ChangeEvent} from 'react';

interface State {
    first : number,
    second: number,
    value: string,
    result: string,
}

// Component 제네릭 첫번째엔 props, 두번째엔 state
class GuGuDan extends Component<{}, State> {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: '',

    }
    onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() *9),
                    value: '',
                }
            });
            // !. 는 input이 null이라는 확신을 갖고 있을때 사용
            // input!.focus();
            if(this.input) {
                this.input.focus();
            }
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            if(this.input) {
                this.input.focus();
            }
        }
    }
    onChange = (e : ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    }
    input: HTMLInputElement | null = null;

    onRefInput = (c: HTMLInputElement) => { this.input = c; };
    render() {
        const { first, second, value, result} = this.state;
        return (
            <>
                <div>{first} 곱하기 {second}는?</div>
                <form onSubmit={this.onSubmitForm}>
                    <input
                        ref={this.onRefInput}
                        type="number"
                        value={value}
                        onChange={this.onChange}
                    />
                </form>
                <div>{result}</div>
            </>
        )
    }
}

export default GuGuDan;