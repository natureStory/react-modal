import React, { PureComponent } from 'react';

import addEventListener from 'rc-util/lib/Dom/addEventListener';

import purpleClose from 'assets/purple_close.png';
import whiteClose from 'assets/white_close.png';
import styles from './index.scss';

// visible, // 控制modal是否显示
// hiddenFooter, 是否隐藏 底部
// hiddenHeader, 是否隐藏头部
// theme, 主题
// children, 内容区
// title, 标题
// style, 自定义样式
// okText, 底部确定自定义文字
// cancelText, 底部取消自定义文字
// onOk, 确定函数
// onCancel, 取消函数 （必填）

let mousePositionEventBinded = false;
let showModal = false;
let mousePosition = {};
const getScrollbarWidth = () => {
  const odiv = document.createElement('div');
  const style = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll'// 让他有滚动条
  };
  Object.keys(style).forEach((item) => {
    odiv.style[item] = style[item];
  });
  document.body.appendChild(odiv);// 把div添加到body中
  const scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;// 相减
  odiv.remove();// 移除创建的div
  return scrollbarWidth;// 返回滚动条宽度
};
class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mousePositionInState: {}
    };
    showModal = props.visible;
  }

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    addEventListener(document.documentElement, 'click', (e) => {
      if (!showModal) {
        mousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
      }
    });
    mousePositionEventBinded = true;
  }

  componentWillReceiveProps(nextProps) {
    showModal = nextProps.visible;
    if (nextProps.visible) {
      this.setState({
        mousePositionInState: mousePosition
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (visible) {
      if (!prevProps.visible) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      }
    } else if (prevProps.visible) {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = 0;
    }
  }

  calTransformOrigin() {
    const { mousePositionInState } = this.state;
    if (!mousePositionInState || (!mousePositionInState.x && !mousePositionInState.y)) {
      return 'center center';
    }
    return `${mousePositionInState.x || 0}px ${mousePositionInState.y || 0}px`;
  }

  render() {
    let themeClose;
    const {
      visible, // 控制modal是否显示
      hiddenFooter,
      hiddenHeader,
      theme,
      children,
      title,
      style,
      okText,
      cancelText,
      onOk,
      onCancel,
      onLeft
    } = this.props;
    switch (theme) {
      case 'white':
        themeClose = whiteClose;
        break;
      case 'purple':
        themeClose = purpleClose;
        break;
      default:
        themeClose = whiteClose;
        break;
    }
    const active = visible ? styles.active : '';
    return (
      <div>
        <div className={`${styles.mask} ${active}`} />
        <div className={`${styles.modal_wrap} ${active}`} style={{ transformOrigin: this.calTransformOrigin() }}>
          <div className={styles.modal} style={style}>
            <div className={styles[`modal_content_${theme || 'white'}`]}>
              {
                !hiddenHeader ? (
                  <div>
                    <div className={styles.modal_close} onClick={onCancel}>
                      <img className={styles.modal_close_x} src={themeClose} />
                    </div>
                    <div className={styles[`modal_header_${theme || 'white'}`]}>
                      <div>{title}</div>
                    </div>
                  </div>) : null
              }
              <div className={styles.modal_body}>{children}</div>
              {
                !hiddenFooter ? (
                  <div className={styles[`modal_footer_${theme || 'white'}`]}>
                    <button type="button" onClick={onLeft} className={styles.cancel_btn}>
                      <span>{cancelText || '取消'}</span>
                    </button>
                    <button type="button" onClick={onOk} className={styles.ok_btn}>
                      <span>{okText || '确定'}</span>
                    </button>
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
