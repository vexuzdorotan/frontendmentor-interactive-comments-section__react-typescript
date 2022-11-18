import React from 'react'

import IComment, { IReplies } from '../@types/comment'

interface props {
  comment: IComment | IReplies
  isReply: boolean
  // replies: IReplies
}

const Card = ({ comment, isReply }: props) => {
  let replyUser

  if ('replyingTo' in comment) {
    replyUser = isReply && `@${comment.replyingTo} `
  }

  return (
    <div className={`bg-neutralWhite m-4 p-4 ${isReply && 'ml-12'}`}>
      <div className='flex justify-between items-center mb-4 mr-16'>
        <img
          src={comment.user.image.png}
          alt={comment.user.username}
          className='h-8'
        />
        <p className='font-bold'>{comment.user.username}</p>
        <p className='text-neutralGrayishBlue'>{comment.createdAt}</p>
      </div>

      <p className='text-neutralGrayishBlue'>
        {replyUser && (
          <span className='text-primaryModerateBlue font-bold'>
            {replyUser}
          </span>
        )}
        {comment.content}
      </p>
    </div>
  )
}

export default Card
