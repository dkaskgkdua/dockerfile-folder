const React = require('react');
const {Component} = React;
const Try2 = require('./Try2')

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for(let i = 0; i < 4; i +=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries : []
    };
    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, {try : this.state.value, result : '홈런!'}],
            })
        } else {
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 돌려서 실패 답은 ${this.state.answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
            } else {
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if(this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, {try : this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                    value : '',
                })
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    };
    render() {
        const { result, value, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {/* 객체방식 */}
                    {tries.map((item, index) => {
                        return (
                            <Try2 key={`${index + 1}차 시도 : `} tryInfo={item} index={index}/>
                        )
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;