import React, { createContext, useContext, useReducer } from 'react'

import { ICommentContext } from '../@types/comment'
import commentsData from '../shared/api/comments'
import commentsReducer from '../reducers/commentsReducer'

interface CommentsProviderProps {
  children: React.ReactNode
}

const initialState = {
  comments: commentsData,
  currentReplyId: null,
}

const CommentsContext = createContext<ICommentContext>({} as ICommentContext)

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState)

  const { comments, currentReplyId } = state

  const value = { comments, currentReplyId, dispatch }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useContextComments = () => useContext(CommentsContext)
