// polyfill React in IE < 11
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

// rem 适配
(function (window) {
  var docWidth = 750 // 设计图宽度
  var rate = 100 // 1rem = 100px
  var minWidth = 320 // 允许的文档最小宽度，低于此不再缩小
  var maxWidth = 414 // 允许的文档最大宽度，高于此不再放大

  var doc = window.document
  var html = doc.documentElement

  function calcRem () {
    var clientWidth = html.getBoundingClientRect().width
    html.style.fontSize = Math.max(Math.min(clientWidth, maxWidth), minWidth) / (docWidth / rate) + 'px'
  }

  window.addEventListener('resize', calcRem, false)
  doc.addEventListener('DOMContentLoaded', calcRem, false)
})(window)

ReactDOM.render(<App />, document.getElementById('root'));
