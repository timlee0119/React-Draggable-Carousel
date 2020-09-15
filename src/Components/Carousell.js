import React, { Component } from 'react';
import './Carousell.css';

class Carousell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curImg: 0,
      imgNum: props.imgs.length,
      imgs: props.imgs.map((img, idx) => (
        <div
          className="carousell-img"
          key={img + idx}
          style={{
            background: `url(${img}) no-repeat center`,
            backgroundSize: '100% 100%'
          }}
        ></div>
      )),
      isDown: false,
      isTransitionFinished: true,
      originWrapperLeft: null,
      startX: null
    };
    this.cRef = React.createRef();
  }

  handleMouseDown = e => {
    if (!this.state.isTransitionFinished) return;
    const carousell = this.cRef.current;
    const startX = e.pageX - carousell.offsetLeft;
    console.log(startX);
    this.setState({
      isDown: true,
      startX,
      originWrapperLeft: carousell.firstChild.offsetLeft
    });
  };

  handleMouseMove = e => {
    const { isDown, startX } = this.state;
    if (!isDown) return;
    const x = e.pageX - this.cRef.current.offsetLeft;
    const walk = x - startX;
    this.moveCarousell(walk);
  };

  handleMouseUp = e => {
    this.handleTransition();
  };

  handleMouseLeave = e => {
    this.handleTransition();
  };

  handleTransition = () => {
    if (!this.state.isDown) return;
    this.setState({ isDown: false, isTransitionFinished: false });
    const cWrapper = this.cRef.current.firstChild;
    const currentWrapperLeft = parseFloat(cWrapper.style.left);
    console.log(currentWrapperLeft, this.state.originWrapperLeft);
    if (
      currentWrapperLeft >
      this.state.originWrapperLeft + this.props.transitionThreshold
    ) {
      // swipe left
      console.log('swipe left!!');
      const transitionCallback = () => {
        this.setState(prevState => ({
          curImg: (prevState.curImg + prevState.imgNum - 1) % prevState.imgNum,
          isTransitionFinished: true
        }));
        cWrapper.removeEventListener(
          'webkitTransitionEnd',
          transitionCallback,
          false
        );
        cWrapper.style.cssText = '';
      };
      cWrapper.addEventListener(
        'webkitTransitionEnd',
        transitionCallback,
        false
      );
      cWrapper.style.transition = 'left 0.5s';
      cWrapper.style.left = '0px';
    } else if (
      currentWrapperLeft <
      this.state.originWrapperLeft - this.props.transitionThreshold
    ) {
      // swipe right
      console.log('swipe right!!');
      const transitionCallback = () => {
        this.setState(prevState => ({
          curImg: (prevState.curImg + 1) % prevState.imgNum,
          isTransitionFinished: true
        }));
        cWrapper.removeEventListener(
          'webkitTransitionEnd',
          transitionCallback,
          false
        );
        cWrapper.style.cssText = '';
      };
      cWrapper.addEventListener(
        'webkitTransitionEnd',
        transitionCallback,
        false
      );
      cWrapper.style.transition = 'left 0.5s';
      cWrapper.style.left = `${this.state.originWrapperLeft * 2}px`;
    } else {
      console.log('dont move');
      const transitionCallback = () => {
        this.setState(prevState => ({
          isTransitionFinished: true
        }));
        cWrapper.removeEventListener(
          'webkitTransitionEnd',
          transitionCallback,
          false
        );
        cWrapper.style.cssText = '';
      };
      cWrapper.addEventListener(
        'webkitTransitionEnd',
        transitionCallback,
        false
      );
      cWrapper.style.transition = 'left 0.5s';
      cWrapper.style.left = `${this.state.originWrapperLeft}px`;
    }
  };

  moveCarousell = walk => {
    const cWrapper = this.cRef.current.firstChild;
    cWrapper.style.left = `${this.state.originWrapperLeft + walk}px`;
  };

  render() {
    console.log('render curImg: ' + this.state.curImg);
    return (
      <div
        className="carousell"
        ref={this.cRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="carousell-img-wrapper">
          {/* haven't handle case when imgNum = 1 */}
          {
            this.state.imgs[
              (this.state.curImg + this.state.imgNum - 1) % this.state.imgNum
            ]
          }
          {this.state.imgs[this.state.curImg]}
          {this.state.imgs[(this.state.curImg + 1) % this.state.imgNum]}
        </div>
      </div>
    );
  }
}

export default Carousell;
