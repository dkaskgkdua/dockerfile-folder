const React = require('react');
const {Component} = React;

class Try2 extends Component {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}


module.exports = Try2;