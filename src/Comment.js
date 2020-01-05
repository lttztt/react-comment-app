/**
 * Created by LiuZhe on 2019/12/23.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired, // 评论对象
    onDeleteComment: PropTypes.func, // 删除的函数
    index: PropTypes.number // 当前评论对象在评论列表的索引
  }
  constructor(props) {
    super(props);
    this.state = {
      timeString: ''
    }
  }
  UNSAFE_componentWillMount() {
    this._updateTimeString()
    this._timer = setInterval(()=>{
      this._updateTimeString();
    }, 5000)
  }
  componentWillUnmount() {
    window.clearInterval(this._timer)
  }

  _updateTimeString(){
    let {comment} = this.props;
    let duration = (+new Date() - comment.createdTime) / 1000;
    this.setState({
      timeString: duration > 60 ? `${Math.round(duration / 60)} 分钟前` : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }
  handleDeleteComment(){
    let {onDeleteComment, index} = this.props;
    if(onDeleteComment){
      onDeleteComment(index)
    }
  }
  _getProcessedContent(content){
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  render() {
    let {props} = this;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{props.comment.username} </span>:
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(props.comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleDeleteComment.bind(this)}
          className='comment-delete'>
          删除
        </span>
      </div>
    )
  }
}
