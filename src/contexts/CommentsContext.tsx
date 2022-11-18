import React, { createContext, useContext, useReducer } from 'react'

import { ICommentContext } from '../@types/comment'
import commentsAPI from '../shared/api/comments'
import commentsReducer from '../reducers/commentsReducer'

interface CommentsProviderProps {
  children: React.ReactNode
}

export const CommentsContext = createContext<ICommentContext | null>(null)

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [comments, dispatch] = useReducer(commentsReducer, commentsAPI)

  // const addComment = () => {
  //   dispatch({
  //     type: 'ADD_COMMENT',
  //     payload: comments,
  //   })
  // }

  return (
    <CommentsContext.Provider value={{ comments }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useContextComments = () => useContext(CommentsContext)
