import React, { createContext, useContext, useReducer } from 'react'

import { ICommentContext } from '../@types/comment'
import commentsAPI from '../shared/api/comments'
import commentsReducer from '../reducers/commentsReducer'

interface CommentsProviderProps {
  children: React.ReactNode
}

const CommentsContext = createContext<ICommentContext>({} as ICommentContext)

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, dispatch] = useReducer(commentsReducer, commentsAPI)

  // const addComment = () => {
  //   dispatch({
  //     type: 'ADD_COMMENT',
  //     payload: comments,
  //   })
  // }

  const value = { comments, dispatch }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useContextComments = () => useContext(CommentsContext)
