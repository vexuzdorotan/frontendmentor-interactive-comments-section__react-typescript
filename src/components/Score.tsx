import React from 'react'

import IComment, { IReplies } from '../@types/comment'

import { useContextComments } from '../contexts/CommentsContext'

interface props {
  comment: IComment | IReplies
}

const Score = ({ comment }: props) => {
  const { dispatch } = useContextComments()

  const upVote = () => {
    dispatch({
      type: 'UPVOTE',
      payload: { id: comment.id },
    })
  }

  const downVote = () => {
    dispatch({
      type: 'DOWNVOTE',
      payload: { id: comment.id },
    })
  }

  return (
    <div
      className={`col-span-1 flex flex-row items-center justify-around bg-neutralVeryLightGray
        text-lg font-medium w-24 h-10 rounded-md md:flex-col md:order-first md:row-span-3 md:w-10 md:h-24`}
    >
      <button
        className='text-neutral-400 hover:text-primaryModerateBlue'
        onClick={upVote}
      >
        +
      </button>
      <span className='text-primaryModerateBlue'>{comment.score}</span>
      <button
        className='text-neutral-400 hover:text-primaryModerateBlue'
        onClick={downVote}
      >
        -
      </button>
    </div>
  )
}

export default Score
