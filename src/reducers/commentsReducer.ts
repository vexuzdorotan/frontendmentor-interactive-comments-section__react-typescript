import IComment from '../@types/comment'

interface ACTION_TYPE {
  type: string
  payload: IComment[]
}

const commentsReducer = (comments: IComment[], action: ACTION_TYPE) => {
  switch (action.type) {
    default:
      return comments
  }
}

export default commentsReducer
