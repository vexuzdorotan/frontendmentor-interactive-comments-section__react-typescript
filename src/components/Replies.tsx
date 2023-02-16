import { Fragment } from 'react'

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
      {replies.map((reply) => (
        <Fragment key={reply.id}>
          <Card
            key={reply.id}
            parentId={parentId}
            comment={reply}
            isReply={true}
          />
          {currentReplyId === reply.id && (
            <AddComment
              type='ADD_REPLY'
              parentId={parentId}
              replyingTo={reply.user.username}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default Replies
