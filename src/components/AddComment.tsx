import React, { useState } from 'react'
import { v4 } from 'uuid'
import { DateTime } from 'luxon'

import { useContextUser } from '../contexts/UserContext'
import { useContextComments } from '../contexts/CommentsContext'
import IUser from '../@types/user'

import TextArea from './TextArea'
import Button from './Button'

const AddComment = () => {
  const [content, setContent] = useState('')

  const { dispatch } = useContextComments()
  const { image, username } = useContextUser() as IUser

  const id = v4()
  const user = { image, username }
  const now = DateTime.now().toString()

  console.log(now)

  const handleAddComment = () => {
    const payload = {
      id,
      content: content,
      createdAt: now,
      score: 0,
      user,
      replies: [],
    }

    dispatch({ type: 'ADD_COMMENT', payload })
    setContent('')
  }

  return (
    <div className='grid grid-cols-2  md:grid-cols-[32px_auto_100px] items-center md:items-start bg-neutralWhite m-4 p-4 mt-4'>
      {/* <textarea
        className='col-span-2 md:col-span-1 resize-none outline-neutralGrayishBlue text-neutralDarkBlue  outline outline-1 rounded-lg px-6 py-4 mb-4 md:mx-4 placeholder:text-neutralGrayishBlue'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder='Add a comment...'
      ></textarea> */}

      <TextArea content={content} setContent={setContent} />

      <img src={image.png} alt={username} className='h-8 md:order-first' />
      <Button
        bgColor='bg-primaryModerateBlue'
        innerText='SEND'
        customClassName='ml-auto'
        onClick={handleAddComment}
      />
    </div>
  )
}

export default AddComment
