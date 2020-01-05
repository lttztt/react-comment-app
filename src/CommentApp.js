/**
 * Created by LiuZhe on 2019/12/23.
 */
import React, {Component} from 'react'
import CommentInput from "./CommentInput"
import CommentList from "./CommentList"

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }
  UNSAFE_componentWillMount() {
    this._loadComments()
  }
  _loadComments() {
    let comments = localStorage.getItem('comments');
    if(comments){
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }
  _saveComments(comments){
    localStorage.setItem('comments', JSON.stringify(comments))
  }
  getInputData(comment){
    if(!comment) return
    if(!comment.username) return alert('请输入用户名')
    if(!comment.content) return alert('请输入评论内容')
    let {comments} = this.state;
    comments.push(comment);
    this._saveComments(comments);
    this.setState({ comments });
  }
  handleDeleteComment(index){
    let {comments} = this.state;
    comments.splice(index, 1);
    this.setState({
      comments
    })
    this._saveComments(comments)
  }
  render(){
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.getInputData.bind(this)}/>
        <CommentList
          onDeleteComment={this.handleDeleteComment.bind(this)}
          comments={this.state.comments}/>
      </div>
    )
  }
}

export default CommentApp