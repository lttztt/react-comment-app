/**
 * Created by LiuZhe on 2019/12/23.
 */
import React, {Component} from 'react'

export default class CommentInput extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      content: ''
    }
  }
  usernameChange(e){
    let value = e.target.value
    this.setState({
      username: value
    })
  }
  usernameBlur(e){
    this._saveUsername(e.target.value)
  }
  _saveUsername(value){
    localStorage.setItem('username', value)
  }
  _loadUsername(){
    let username = localStorage.getItem('username') || '';
    this.setState({
      username
    })
  }
  contentChange(e){
    let value = e.target.value
    this.setState({
      content: value
    })
  }
  handleSubmit(){
    if(this.props.onSubmit){
      const {username, content} = this.state
      this.props.onSubmit({username, content, createdTime: +new Date()})
      this.setState({
        content: ''
      })
    }
  }
  UNSAFE_componentWillMount() {
    this._loadUsername()
  }

  componentDidMount() {
    this.textarea.focus()
  }
  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              onChange={this.usernameChange.bind(this)}
              onBlur={this.usernameBlur.bind(this)}
              value={this.state.username} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea)=> this.textarea = textarea}
              onChange={this.contentChange.bind(this)}
              value={this.state.content} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}