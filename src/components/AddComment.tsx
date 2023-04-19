import { useState } from 'react'
import { v4 } from 'uuid'
import { DateTime } from 'luxon'

import { useContextUser } from '../contexts/UserContext'
import { useContextComments } from '../contexts/CommentsContext'
import IUser from '../@types/user'

import TextArea from './TextArea'
import Button from './Button'

interface Props {
  type?: string
  parentId?: number | null
  replyingTo?: string
}

const AddComment = ({
  type = 'ADD_COMMENT',
  parentId = null,
  replyingTo,
}: Props) => {
  const initialContent = type === 'ADD_REPLY' ? `@${replyingTo} ` || '' : ''

  const [content, setContent] = useState(initialContent)

  const { dispatch } = useContextComments()

  const user = useContextUser() as IUser
  const { image, username } = user

  const id = v4()
  const now = DateTime.now().toString()

  const handleAddComment = () => {
    if (type === 'ADD_COMMENT') {
      const commentData = {
        id,
        content: content,
        createdAt: now,
        score: 0,
        user,
        replies: [],
      }

      const payload = {
        commentData,
      }

      dispatch({ type, payload })
    }

    if (type === 'ADD_REPLY') {
      const commentData = {
        id,
        content: content.replace(`@${replyingTo} `, '').trim(),
        createdAt: now,
        score: 0,
        replyingTo,
        user,
      }

      const payload = {
        type,
        parentId,
        commentData,
      }

      dispatch({ type, payload })
    }

    setContent('')
  }

  return (
    <div
      className={`grid grid-cols-2 ${
        type === 'ADD_REPLY' && 'ml-4 md:ml-8'
      } md:grid-cols-[32px_auto_100px] items-center md:items-start bg-neutralWhite rounded-md m-4 p-4 mt-4`}
    >
      <TextArea
        content={content}
        setContent={setContent}
        customClass='md:ml-6 md:mr-4'
      />

      <img
        src={`${process.env.PUBLIC_URL}/${image.png}`}
        alt={username}
        className='max-w-none h-10 md:order-first'
      />
      <Button
        bgColor='bg-primaryModerateBlue hover:opacity-30'
        innerText={`${type === 'ADD_COMMENT' ? 'SEND' : 'REPLY'}`}
        onClick={handleAddComment}
        customClassName='ml-auto'
        // customClassName={`ml-auto${!content ? ' opacity-30' : ''}`}
        // disabled={!content}
      />
    </div>
  )
}

export default AddComment
