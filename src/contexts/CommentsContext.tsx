import React, { createContext, useContext, useEffect, useReducer } from 'react'

import { ICommentContext } from '../@types/comment'
import commentsData from '../shared/api/comments'
import commentsReducer from '../reducers/commentsReducer'

interface CommentsProviderProps {
  children: React.ReactNode
}

const CommentsContext = createContext<ICommentContext>({} as ICommentContext)

export const CommentsProvider = ({ children }: CommentsProviderProps) => {
  const COMMENTS_KEY = 'commentsState'
  const commentsFromStorage = localStorage.getItem(COMMENTS_KEY)

  let parsedCommentsFromStorage = null

  if (commentsFromStorage)
    parsedCommentsFromStorage = JSON.parse(commentsFromStorage)

  const initialState = {
    comments: commentsData,
    currentReplyId: null,
  }

  const [state, dispatch] = useReducer(
    commentsReducer,
    parsedCommentsFromStorage || initialState
  )

  useEffect(() => {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(state))
  }, [state])

  const value = { ...state, dispatch }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useContextComments = () => useContext(CommentsContext)
