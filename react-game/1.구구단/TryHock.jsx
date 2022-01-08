const React = require('react');

// class TryHock extends React.PureComponent {
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
const { memo } = React;
const TryHock = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
});


module.exports = TryHock;