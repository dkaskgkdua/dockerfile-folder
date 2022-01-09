const React = require('react');

// class TryHock extends React.PureComponent {
//  // 뭔가 프롭스에 정밀한 동작이 필요한경우 constructor 활용
//     constructor(props) {
//         super(props);
//         const filtered = this.props.filter(() => {});
//     }
//  // props를 바꿔야하는 경우 state를 사용하는 안티패턴
//     state = {
//         result: this.props.result, // filtered 사용 가능
//         try: this.props.try,
//     };
//     render() {
//         const { tryInfo } = this.props;
//         return (
//             <li>
//                 <div>{tryInfo.try}</div>
//                 <div>{tryInfo.result}</div>
//             </li>
//         )
//     }
// }
const { memo, useState } = React;
const TryHock = memo(({ tryInfo }) => {
    // 안티패턴이지만 props값을 변경해야 하는 케이스
    // props를 state로 받아서 그 state를 변경해주는 패턴(그래야 부모에게 영향X)
    const [result, setResult] = useState(tryInfo.result);
    const onClick = () => {
      setResult('1');
    };
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick} >{result}</div>
            {/*<div>{tryInfo.result}</div>*/}
        </li>
    )
});


module.exports = TryHock;