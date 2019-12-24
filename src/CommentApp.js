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
  getInputData(comment){
    this.state.comments.push(comment)
    this.setState({
      comments: this.state.comments
    })
  }
  render(){
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.getInputData.bind(this)}/>
        <CommentList comments={this.state.comments}/>
      </div>
    )
  }
}

export default CommentApp