import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaReply } from 'react-icons/fa'

import { useContextUser } from '../contexts/UserContext'
import IUser from '../@types/user'
import IComment, { IReplies } from '../@types/comment'

interface props {
  comment: IComment | IReplies
  isReply: boolean
  // replies: IReplies
}

const Card = ({ comment, isReply }: props) => {
  const { username } = useContextUser() as IUser

  let replyUser

  if ('replyingTo' in comment) {
    replyUser = isReply && `@${comment.replyingTo} `
  }

  return (
    <div
      className={`grid grid-cols-2 bg-neutralWhite m-4 p-4 ${
        isReply && 'ml-12'
      }`}
    >
      {/* user */}
      <div className='col-span-2 flex justify-between items-center mb-4 mr-8'>
        <img
          src={comment.user.image.png}
          alt={comment.user.username}
          className='h-8'
        />
        <p className='font-bold'>{comment.user.username}</p>
        {comment.user.username === username && (
          <div className='w-10 bg-primaryModerateBlue text-neutralWhite text-sm text-center'>
            you
          </div>
        )}

        <p className='text-neutralGrayishBlue'>{comment.createdAt}</p>
      </div>

      {/* content */}
      <p className='col-span-2 text-neutralGrayishBlue mb-4'>
        {replyUser && (
          <span className='text-primaryModerateBlue font-bold'>
            {replyUser}
          </span>
        )}
        {comment.content}
      </p>

      {/* score */}
      <div className='col-span-1 flex flex-row items-center justify-around bg-neutralVeryLightGray text-lg font-medium w-24 h-10 rounded-md lg:flex-col'>
        <button className='text-neutral-400 hover:text-primaryModerateBlue'>
          +
        </button>
        <span className='text-primaryModerateBlue'>{comment.score}</span>
        <button className='text-neutral-400 hover:text-primaryModerateBlue'>
          -
        </button>
      </div>

      {/* modify */}
      <div className='col-span-1 flex flex-row items-center justify-around text-lg font-medium h-10 rounded-md lg:flex-col'>
        {comment.user.username === username ? (
          <>
            {' '}
            <button className='text-primarySoftRed'>
              <span className='flex items-center'>
                <MdDelete /> Delete
              </span>
            </button>
            <button className='text-primaryModerateBlue'>
              <span className='flex items-center'>
                <MdEdit /> Edit
              </span>
            </button>
          </>
        ) : (
          <button className='text-primaryModerateBlue'>
            <span className='flex items-center'>
              <FaReply className='mr-2' /> Reply
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default Card
