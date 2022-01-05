const React = require('react');
const {Component} = React;

class Try extends Component {
    render() {
        return (
            <li>
                <b>{this.props.value.fruit}</b> - {this.props.index}
                <div>컨첸츠1</div>
                <div>컨첸츠2</div>
                <div>컨첸츠3</div>
            </li>
        )
    }
}


module.exports = Try;