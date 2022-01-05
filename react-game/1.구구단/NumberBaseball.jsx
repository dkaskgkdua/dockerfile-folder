const React = require('react');
const {Component} = React;
const Try = require('./Try')

function getNumbers() {

}

class NumberBaseball extends Component {
    state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries : []
    };
    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };
    fruits = [
        {fruit : '사과', taste:'맛있다'}
        ,{fruit : '바나나',taste: '맛있다'}
        ,{fruit : '술', taste: '맛있다'}
        ,{fruit : '감', taste: '맛있다'}
        ,{fruit : '배', taste: '맛있다'}
    ]
    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {/* 2차원 배열 */}
                    {[['사과',['맛있다']]
                        ,['바나나',['맛있다']]
                        ,['술',['맛있다']]
                        ,['감',['맛있다']]
                        ,['배',['맛있다']]
                    ].map((item) => {
                        return (
                            <li key={item[0]}><b>{item[0]}</b> - {item[1]}</li>
                        )
                    })}
                    {/* 객체방식 */}
                    {this.fruits.map((item, index) => {
                        return (
                            <Try value={item} index={index}/>
                        )
                    })}
                    {['사과','바나나','술','감','배',].map((item) => {
                        return (
                            <li key={item}>{item}</li>
                        )
                    })}
                </ul>
            </>
        );
    }
}

module.exports = NumberBaseball;