# react-modal
react modal with animation
### 说明
参照antd的modal，实现在点击的地方弹出并记录位置，关闭的时候缩小到原来位置
弹出的时候禁止body滚动，关闭之后可以滚动，在componentDidUpdate控制
### 参数
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
