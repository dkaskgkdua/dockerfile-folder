const React = require('react')
const ReactDom = require('react-dom')
// 클래스
const ResponseCheck = require('./ResponseCheckHock')


ReactDom.render(<ResponseCheck/>, document.querySelector('#root'))