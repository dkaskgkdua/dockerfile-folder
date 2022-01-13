const React = require('react');
const { PureComponent } = React;

// 아래 코드는 훅스(useState 같은..)가 아님 함수 컴포넌임.
// const Ball = memo(({ number }) => {
//     const { number } = this.props;
//     let background;
//     if(number <= 10) {
//         background = 'red';
//     } else if(number <= 20) {
//         background = 'orange';
//     } else if(number <= 30) {
//         background = 'yellow';
//     } else if(number <= 40) {
//         background = 'blue';
//     } else {
//         background = 'green';
//     }
//     return (
//         <div className="ball" style={{ background }}>{number}</div>
//     )
// });

class Ball extends PureComponent {
    render() {
        const { number } = this.props;
        let background;
        if(number <= 10) {
            background = 'red';
        } else if(number <= 20) {
            background = 'orange';
        } else if(number <= 30) {
            background = 'yellow';
        } else if(number <= 40) {
            background = 'blue';
        } else {
            background = 'green';
        }
        return (
            <div className="ball" style={{ background }}>{number}</div>
        )
    }
}

module.exports = Ball;