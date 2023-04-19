import { Fragment } from 'react'

import { ICommentContext } from '../@types/comment'
import { useContextComments } from '../contexts/CommentsContext'

import Card from './Card'
import Replies from './Replies'
import AddComment from './AddComment'

const Comments = () => {
  const { comments, currentReplyId } = useContextComments() as ICommentContext

  return (
    <div className='container mx-auto lg:px-60'>
      {comments.map((comment) => {
        const { id: parentId, replies } = comment
        const repliesLength = comment.replies.length
        const replyingTo = comment.user.username

        return (
          <Fragment key={comment.id}>
            <Card comment={comment} isReply={false} />

            <div className='ml-4 md:ml-12 border-l-2 border-neutral-200'>
              {currentReplyId === comment.id && (
                <AddComment
                  type='ADD_REPLY'
                  parentId={parentId}
                  replyingTo={replyingTo}
                />
              )}

              {repliesLength !== 0 && (
                <Replies parentId={parentId} replies={replies} />
              )}
            </div>
          </Fragment>
        )
      })}
      <AddComment />
    </div>
  )
}

export default Comments
