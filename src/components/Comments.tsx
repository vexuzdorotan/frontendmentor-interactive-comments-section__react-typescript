import React, { useState } from 'react'

import commentsAPI from '../shared/api/comments'
import IComment, { IReplies } from '../models/commentModel'

import Card from './Card'

interface props {
  comments: Array<IComment>
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
  // replies: Array<IReplies>
}

const cardsReplies = (replies: IReplies[]) => {
  return replies.map((reply) => {
    return <Card key={reply.id} comment={reply} isReply={true} />
  })
}

const cardsComments = (comments: IComment[]) => {
  return comments.map((comment) => {
    return (
      <>
        <Card key={comment.id} comment={comment} isReply={false} />
        {comment.replies.length !== 0 && cardsReplies(comment.replies)}
      </>
    )
  })
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Array<IComment>>(commentsAPI)

  return <>{cardsComments(comments)}</>
}

export default Comments
