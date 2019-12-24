/**
 * Created by LiuZhe on 2019/12/23.
 */
import React from 'react'


export default function Comment(props){
  return (
    <div className='comment'>
      <div className='comment-user'>
        <span>{props.comment.username} </span>:
      </div>
      <p>{props.comment.content}</p>
    </div>
  )
}