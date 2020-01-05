/**
 * Created by LiuZhe on 2019/12/23.
 */
import React, {Component} from 'react'
import Comment from "./Comment"
import PropTypes from 'prop-types'

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }
  static defaultProps = {
    comments: []
  }

  handleDeleteComment(index){
    let {onDeleteComment} = this.props;
    if(onDeleteComment){
      onDeleteComment(index)
    }
  }
  render() {
    return (
      <div>{
        this.props.comments.map((comment, i)=>{
          return <Comment
            comment={comment}
            onDeleteComment={this.handleDeleteComment.bind(this)}
            index={i}
            key={i} />
        })
      }</div>
    )
  }
}