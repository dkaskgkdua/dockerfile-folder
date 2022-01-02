const React = require('react')
const ReactDom = require('react-dom')
// 클래스
const WordRelay = require('./WordRelayHooks')

ReactDom.render(<WordRelay/>, document.querySelector('#root'))