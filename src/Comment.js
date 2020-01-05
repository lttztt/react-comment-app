/**
 * Created by LiuZhe on 2019/12/23.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
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

  render() {
    let {props} = this;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{props.comment.username} </span>:
        </div>
        <p>{props.comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
      </div>
    )
  }
}
// export default function Comment(props){
//   return (
//     <div className='comment'>
//       <div className='comment-user'>
//         <span>{props.comment.username} </span>:
//       </div>
//       <p>{props.comment.content}</p>
//     </div>
//   )
// }

