import React from 'react'

import IComment, { IReplies, ICommentContext } from '../@types/comment'
import { useContextComments } from '../contexts/CommentsContext'

import Card from './Card'

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

const Comments = () => {
  const { comments } = useContextComments() as ICommentContext

  return <>{cardsComments(comments)}</>
}

export default Comments
