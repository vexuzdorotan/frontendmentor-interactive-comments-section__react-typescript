import IComment from '../@types/comment'

interface ACTION_TYPE {
  type: string
  payload: any
}

const commentsReducer = (comments: IComment[], action: ACTION_TYPE) => {
  // const recursiveUpdateComment = (
  //   comments: IComment[],
  //   id: number,
  //   newContent: string
  // ) => {
  //   return comments.map((comment): IComment => {
  //     if (comment.id === id) {
  //       return { ...comment, content: newContent }
  //     } else if (comment.replies) {
  //       const replies: any = comment.replies
  //       return {
  //         ...comment,
  //         replies: recursiveUpdateComment(replies, id, newContent),
  //       }
  //     }

  //     return comment
  //   })
  // }

  switch (action.type) {
    case 'ADD_COMMENT':
      return [...comments, action.payload]
    case 'DELETE_COMMENT':
      return comments
        .filter((comment) => comment.id !== action.payload.id)
        .map((comment) => {
          return {
            ...comment,
            replies: comment.replies.filter(
              (reply) => reply.id !== action.payload.id
            ),
          }
        })
    case 'UPDATE_COMMENT':
      // return recursiveUpdateComment(
      //   comments,
      //   action.payload.id,
      //   action.payload.content
      // )

      return comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            content: action.payload.content,
          }
        } else {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === action.payload.id) {
                return {
                  ...reply,
                  content: action.payload.content,
                }
              }
              return reply
            }),
          }
        }
      })
    default:
      return comments
  }
}

export default commentsReducer
