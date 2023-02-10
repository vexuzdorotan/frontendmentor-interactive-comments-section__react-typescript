import React, { useState } from 'react'

import IUser from '../@types/user'
import IComment, { IReplies } from '../@types/comment'

import { useContextUser } from '../contexts/UserContext'
import { useContextComments } from '../contexts/CommentsContext'

import UserDetails from './UserDetails'
import Content from './Content'
import Score from './Score'
import ModifyOrReply from './ModifyOrReply'
import Button from './Button'

interface Props {
  parentId?: number
  comment: IComment | IReplies
  isReply: boolean
}

const Card = ({ comment, isReply }: Props) => {
  const { username } = useContextUser() as IUser
  const { dispatch } = useContextComments()

  let replyUser: string = ''

  if ('replyingTo' in comment && isReply) replyUser = `@${comment.replyingTo} `

  const [isEdit, setIsEdit] = useState(false)
  const [editedContent, setEditedContent] = useState(
    `${replyUser} ${comment.content}`
  )

  const handleUpdate = async () => {
    dispatch({
      type: 'UPDATE_COMMENT',
      payload: { id: comment.id, content: editedContent },
    })

    setIsEdit(false)
  }

  return (
    <div
      className={`grid grid-cols-2 bg-neutralWhite m-4 p-4 ${
        isReply && 'ml-12'
      } md:grid-cols-[70px_auto_100px] md:auto_auto_auto`}
    >
      <UserDetails comment={comment} username={username} />

      <Content
        comment={comment}
        isEdit={isEdit}
        replyUser={replyUser}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
      />

      <Score comment={comment} />

      <ModifyOrReply
        comment={comment}
        username={username}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      {isEdit && (
        <div className='col-span-1 flex items-center justify-end md:col-end-4'>
          <Button
            bgColor='bg-primaryModerateBlue'
            innerText='UPDATE'
            customClassName={`w-0 ml-auto${!editedContent ? 'opacity-30' : ''}`}
            onClick={handleUpdate}
            disabled={!editedContent}
          />
        </div>
      )}
    </div>
  )
}

export default Card
