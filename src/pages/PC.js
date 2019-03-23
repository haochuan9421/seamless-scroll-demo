import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SeamlessScroll from 'seamless-scroll';
import './PC.scss';
import qrcode from '../assets/qrcode.png';

class PC extends Component {
  state = {
    curIndex: 0
  };
  constructor(props) {
    super(props);
    this.boxRef = React.createRef(); // 容器 DOM
  }
  componentDidMount() {
    const _this = this;
    // 实例化
    _this.scroller = new SeamlessScroll({
      el: _this.boxRef.current, // 容器元素
      direction: 'left', // 滚动的方向
      width: document.body.clientWidth, // 容器的宽度，单位 px
      height: 400, // 容器的高度，单位 px
      delay: 2000, // 每屏停留的时间，单位 ms
      duration: 800, // 滚动一屏需要的时间，单位 ms
      activeIndex: 0, // 默认显示的元素在列表中的索引，从 0 开始
      autoPlay: true, // 是否自动开始播放
      onChange(curIndex) {
        _this.setState(() => ({ curIndex }));
      }
    });
    // 监听浏览器窗口的大小改变
    (function() {
      var resizing,
        resizeTimer,
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      _this.resizeHandler = function() {
        if (!resizing) {
          // 第一次触发，停止 scroller 的滚动
          resizing = true;
          _this.scroller.stop();
        }
        resizeTimer && clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // 停下来后，重设 scroller 的宽高，并继续之前的播放
          resizing = false;
          _this.scroller.resize(document.body.clientWidth, 400);
          requestAnimationFrame(function() {
            _this.scroller.continue();
          });
        }, 100);
      };
      window.addEventListener('resize', _this.resizeHandler);
    })();
  }
  componentWillUnmount() {
    // 销毁插件实例
    this.scroller.destory();
    // 移除监听器
    window.removeEventListener('resize', this.resizeHandler);
  }
  render() {
    return (
      <div className='pc-page'>
        {/* 容器 */}
        <div className='box' ref={this.boxRef}>
          {/* 列表 */}
          <ul>
            {/* 子元素们 */}
            <li style={{ background: '#0066FF' }}>1</li>
            <li style={{ background: '#FF33FF' }}>2</li>
            <li style={{ background: '#99CC33' }}>3</li>
            <li style={{ background: '#FF3333' }}>4</li>
            <li style={{ background: '#FFCC00' }}>5</li>
          </ul>
          {/* 前进后退小箭头 */}
          <div
            className='btn pre-btn'
            onClick={() => {
              this.scroller.go('right');
            }}
          >
            <svg width='30' height='60' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <polyline points='25 5, 10 30, 25 55' stroke='#fff' fill='transparent' strokeWidth='3' />
            </svg>
          </div>
          <div
            className='btn next-btn'
            onClick={() => {
              this.scroller.go('left');
            }}
          >
            <svg width='30' height='60' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <polyline points='5 5, 20 30, 5 55' stroke='#fff' fill='transparent' strokeWidth='3' />
            </svg>
          </div>
          {/* 指示器 */}
          <ol className='dots'>
            {[0, 1, 2, 3, 4].map(index => (
              <li
                key={index}
                className={this.state.curIndex === index ? 'active' : ''}
                onClick={() => {
                  this.scroller.go(index);
                }}
              />
            ))}
          </ol>
        </div>
        {/* 移动端在线预览二维码 */}
        <div className='qrcode'>
          <p>
            <Link to='/mobile'>扫码体验移动端</Link>
          </p>
          <img src={qrcode} alt='qrcode' />
        </div>
      </div>
    );
  }
}

export default PC;
