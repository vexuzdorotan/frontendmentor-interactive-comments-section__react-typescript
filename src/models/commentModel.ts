import IUser from './userModel'

export interface IReplies {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: IUser
}

export default interface IComment {
  id: number
  content: string
  createdAt: string
  score: number
  user: IUser
  replies: IReplies[]
}
