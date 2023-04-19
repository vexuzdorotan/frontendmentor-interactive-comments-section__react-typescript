import React from 'react'
import { DateTime } from 'luxon'

import IComment, { IReplies } from '../@types/comment'

interface props {
  comment: IComment | IReplies
  username: string
}

const UserDetails = ({ comment, username }: props) => {
  const convertTimeToRelative = (createdAt: string) => {
    const pastDate = DateTime.fromISO(createdAt)

    return pastDate.toRelative()
  }

  return (
    <div className='col-span-2 flex justify-start items-center gap-x-4 mb-4 md:mr-8 md:col-start-2 md:col-end-3 md:mb-0'>
      <img
        src={`${process.env.PUBLIC_URL}/${comment.user.image.png}`}
        alt={comment.user.username}
        className='h-8'
      />
      <p className='font-bold'>{comment.user.username}</p>
      {comment.user.username === username && (
        <div className='w-10 bg-primaryModerateBlue text-neutralWhite text-sm text-center'>
          you
        </div>
      )}

      <p className='text-neutralGrayishBlue'>
        {convertTimeToRelative(comment.createdAt)}
      </p>
    </div>
  )
}

export default UserDetails
