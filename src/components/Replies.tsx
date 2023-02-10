import React from 'react'

import { IReplies, ICommentContext } from '../@types/comment'
import { useContextComments } from '../contexts/CommentsContext'

import Card from '../components/Card'
import AddComment from '../components/AddComment'

interface Props {
  parentId: number
  replies: IReplies[]
}

const Replies = ({ parentId, replies }: Props) => {
  const { currentReplyId } = useContextComments() as ICommentContext

  return (
    <>
      {replies.map((reply) => {
        return (
          <>
            <Card
              key={reply.id}
              parentId={parentId}
              comment={reply}
              isReply={true}
            />
            {currentReplyId === reply.id && <AddComment />}
          </>
        )
      })}
    </>
  )
}

export default Replies
