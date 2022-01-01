const React = require('react')
const {Component} = React;

// 클래스
class WordRelay extends Component {
    state = {
        text: 'Hello, webpack'
    };
    render() {
        return <h1>{this.state.text}</h1>;
    }
}

module.exports = WordRelay;