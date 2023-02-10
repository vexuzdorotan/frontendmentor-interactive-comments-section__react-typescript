import { Dispatch } from 'react'

import IUser from './user'

export interface IReplies {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: IUser
}

export interface ICommentContext {
  comments: IComment[]
  currentReplyId: number | null
  dispatch: Dispatch
}

export default interface IComment {
  id: number
  content: string
  createdAt: string
  score: number
  user: IUser
  replies: IReplies[]
}
