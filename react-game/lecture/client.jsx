const React = require('react')
const ReactDom = require('react-dom')
// 클래스
const RenderTest = require('./RenderTest')

ReactDom.render(<RenderTest/>, document.querySelector('#root'))