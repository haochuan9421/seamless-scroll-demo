import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SeamlessScroll from 'seamless-scroll';
import './Mobile.scss';
import tipIcon from '../assets/tip.jpg';

class Mobile extends Component {
  state = {
    curIndex: 0
  };
  constructor(props) {
    super(props);
    this.bannerRef = React.createRef(); // 容器1-banner 的 DOM
    this.newsRef = React.createRef(); // 容器2-头条快报的 DOM
  }
  componentDidMount() {
    const _this = this;
    /**
     * 在 rem 布局下，px值设置说明：
     * 本项目中 rem 值的设置是基于 750 设计稿中的像素除 100 得到的
     * 比如在设计稿中 banner 的高度是 350px，那么他 css 中的 height 就是 3.5 rem
     * 如果在 375px 宽度的屏中, 此时 html 的 font-size 会被设置为 50px
     * 这样实际显示的尺寸就是 175px 高度了
     * 此时 (实际尺寸 / 设计稿尺寸) = 0.5
     * 所以我们通过 px 值设置元素高度时，就是 350 * 0.5 px
     * 这里的 0.5 就是通过下面的式子计算出来的
     */
    let rate = Math.max(Math.min(document.body.clientWidth, 414), 320) / 750;

    // 实例化 banner
    _this.bannerScroller = new SeamlessScroll({
      el: _this.bannerRef.current, // 容器元素
      direction: 'left', // 滚动的方向
      width: document.body.clientWidth, // 容器的宽度，单位 px
      height: 350 * rate, // 容器的高度，单位 px
      delay: 2000, // 每屏停留的时间，单位 ms
      duration: 600, // 滚动一屏需要的时间，单位 ms
      activeIndex: 0, // 默认显示的元素在列表中的索引，从 0 开始
      autoPlay: true, // 是否自动开始播放
      prevent: true, // 是否阻止页面滚动
      onChange(curIndex) {
        _this.setState(() => ({ curIndex }));
      }
    });
    // 实例化头条快报
    _this.newsScroller = new SeamlessScroll({
      el: _this.newsRef.current, // 容器元素
      direction: 'up', // 滚动的方向
      width: document.body.clientWidth - 240 * rate, // 容器的宽度，单位 px
      height: 50 * rate, // 容器的高度，单位 px
      delay: 3000, // 每屏停留的时间，单位 ms
      duration: 500, // 滚动一屏需要的时间，单位 ms
      activeIndex: 0, // 默认显示的元素在列表中的索引，从 0 开始
      autoPlay: true, // 是否自动开始播放,
      prevent: true // 是否阻止页面滚动
    });
    // 监听手机方向的改变
    (function() {
      var resizing,
        resizeTimer,
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      _this.resizeHandler = function() {
        rate = Math.max(Math.min(document.body.clientWidth, 414), 320) / 750;
        if (!resizing) {
          // 第一次触发，停止 scroller 的滚动
          resizing = true;
          _this.bannerScroller.stop();
          _this.newsScroller.stop();
        }
        resizeTimer && clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // 停下来后，重设 scroller 的宽高，并继续之前的播放
          resizing = false;
          _this.bannerScroller.resize(document.body.clientWidth, 350 * rate);
          _this.newsScroller.resize(document.body.clientWidth - 240 * rate, 50 * rate);
          requestAnimationFrame(function() {
            _this.bannerScroller.continue();
            _this.newsScroller.continue();
          });
        }, 100);
      };
      window.addEventListener('resize', _this.resizeHandler);
    })();
  }
  componentWillUnmount() {
    // 销毁插件实例
    this.bannerScroller.destroy();
    this.newsScroller.destroy();
    // 移除监听器
    window.removeEventListener('resize', this.resizeHandler);
  }
  render() {
    return (
      <div className='mobile-page'>
        {/* 容器1-banner */}
        <section className='banner' ref={this.bannerRef}>
          {/* 列表 */}
          <ul>
            {/* 子元素们 */}
            <li style={{ background: '#0066FF' }}>1</li>
            <li style={{ background: '#FF33FF' }}>2</li>
            <li style={{ background: '#99CC33' }}>3</li>
            <li style={{ background: '#FF3333' }}>4</li>
            <li style={{ background: '#FFCC00' }}>5</li>
          </ul>
          {/* 小圆点指示器 */}
          <ol className='dots'>
            {[0, 1, 2, 3, 4].map(index => (
              <li key={index} className={this.state.curIndex === index ? 'active' : ''} />
            ))}
          </ol>
        </section>

        {/* 容器2-头条快报 */}
        <section className='news bd-1px-t bd-1px-b'>
          <div className='tip'>
            <img src={tipIcon} alt='头条快报' />
          </div>
          <div className='list' ref={this.newsRef}>
            <ul>
              <li>3月25日苹果发布会，新产品提前知晓</li>
              <li>注意了，汽车尾量不达标，无法上牌</li>
              <li>止不住流的口水，一锅麻辣小龙虾满足吃货们蠢蠢欲动的心</li>
            </ul>
          </div>
          <div className='more bd-1px-l'>更多</div>
        </section>

        {/* PC 端链接 */}
        <p className='link'>
          <Link to='/pc'>点击查看 PC 端</Link>
        </p>
      </div>
    );
  }
}

export default Mobile;
