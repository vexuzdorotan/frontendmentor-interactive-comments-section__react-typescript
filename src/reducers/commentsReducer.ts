import IComment from '../@types/comment'

interface IState {
  comments: IComment[]
  currentReplyId: number | null
}
interface ACTION_TYPE {
  type: string
  payload: any
}

const commentsReducer = (state: IState, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'UPVOTE': {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              score: comment.score + 1,
            }
          } else {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === action.payload.id) {
                  return {
                    ...reply,
                    score: reply.score + 1,
                  }
                }
                return reply
              }),
            }
          }
        }),
      }
    }
    case 'DOWNVOTE': {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              score: comment.score - 1,
            }
          } else {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === action.payload.id) {
                  return {
                    ...reply,
                    score: reply.score - 1,
                  }
                }
                return reply
              }),
            }
          }
        }),
      }
    }
    case 'REPLY': {
      return {
        ...state,
        currentReplyId: action.payload.id,
      }
    }
    case 'ADD_COMMENT': {
      return {
        ...state,
        comments: [...state.comments, action.payload.commentData],
        currentReplyId: null,
      }
    }
    case 'ADD_REPLY': {
      const newState = { ...state }

      const parentIndex = newState.comments.findIndex(
        (comment) => comment.id === action.payload.parentId
      )

      newState.comments[parentIndex].replies.push(action.payload.commentData)
      newState.currentReplyId = null

      return newState
    }
    case 'UPDATE_COMMENT': {
      return {
        ...state,
        comments: state.comments.map((comment) => {
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
        }),
      }
    }
    case 'DELETE_COMMENT': {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload.id)
          .map((comment) => {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== action.payload.id
              ),
            }
          }),
      }
    }
    default: {
      return state
    }
  }
}

export default commentsReducer
