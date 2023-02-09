import { Fragment } from 'react'

import { IReplies, ICommentContext } from '../@types/comment'
import { useContextComments } from '../contexts/CommentsContext'

import Card from './Card'
import AddComment from './AddComment'

const cardsReplies = (parentId: number, replies: IReplies[]) => {
  return replies.map((reply) => {
    return (
      <Card key={reply.id} parentId={parentId} comment={reply} isReply={true} />
    )
  })
}

// const cardsComments = (comments: IComment[]) => {
//   return comments.map((comment) => {
//     return (
//       <Fragment key={comment.id}>
//         <Card comment={comment} isReply={false} />
//         {comment.replies.length !== 0 && cardsReplies(comment.replies)}
//       </Fragment>
//     )
//   })
// }

const Comments = () => {
  const { comments } = useContextComments() as ICommentContext

  return (
    <>
      {comments.map((comment) => {
        return (
          <Fragment key={comment.id}>
            <Card comment={comment} isReply={false} />
            {comment.replies.length !== 0 &&
              cardsReplies(comment.id, comment.replies)}
          </Fragment>
        )
      })}
      <AddComment />
    </>
  )
}

export default Comments
