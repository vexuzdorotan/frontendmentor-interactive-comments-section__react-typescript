import IComment from '../@types/comment'

interface ACTION_TYPE {
  type: string
  payload: any
  // payload: IComment[] | number
}

const commentsReducer = (comments: IComment[], action: ACTION_TYPE) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...comments, action.payload]
    case 'DELETE_COMMENT':
      return comments
        .filter((comment) => comment.id !== action.payload)
        .map((comment) => {
          return {
            ...comment,
            replies: comment.replies.filter(
              (reply) => reply.id !== action.payload
            ),
          }
        })
    default:
      return comments
  }
}

export default commentsReducer
