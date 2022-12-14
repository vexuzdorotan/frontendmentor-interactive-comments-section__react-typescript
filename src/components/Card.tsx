import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaReply } from 'react-icons/fa'
import ReactModal from 'react-modal'
import { DateTime } from 'luxon'

import IUser from '../@types/user'
import IComment, { IReplies } from '../@types/comment'

import { useContextUser } from '../contexts/UserContext'
import { useContextComments } from '../contexts/CommentsContext'

import TextArea from './TextArea'
import Button from './Button'

interface props {
  comment: IComment | IReplies
  isReply: boolean
  // replies: IReplies
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
  },
  content: {
    width: '22rem',
    padding: '2rem 1.5rem',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

const Card = ({ comment, isReply }: props) => {
  const { username } = useContextUser() as IUser
  const { dispatch } = useContextComments()

  let replyUser: string = ''

  if ('replyingTo' in comment && isReply) {
    replyUser = `@${comment.replyingTo} `
  }

  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editContent, setEditContent] = useState(replyUser)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleDelete = async () => {
    dispatch({
      type: 'DELETE_COMMENT',
      payload: comment.id,
    })

    closeModal()
  }

  const convertTimeToRelative = (createdAt: string) => {
    const pastDate = DateTime.fromISO(createdAt)

    return pastDate.toRelative()
  }

  return (
    <div
      className={`grid grid-cols-2 bg-neutralWhite m-4 p-4 ${
        isReply && 'ml-12'
      } md:grid-cols-[70px_auto_100px] md:grid-rows-3`}
    >
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Delete Modal'
        ariaHideApp={false}
      >
        <h1 className='text-xl font-semibold text-neutralDarkBlue mb-4'>
          Delete comment
        </h1>

        <p className='text-neutralDarkBlue mb-4'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>

        <div className='flex justify-between'>
          <Button
            innerText='NO, CANCEL'
            bgColor='bg-neutralGrayishBlue'
            onClick={closeModal}
          />
          <Button
            innerText='YES, DELETE'
            bgColor='bg-primarySoftRed'
            onClick={handleDelete}
          />
        </div>
      </ReactModal>

      {/* user */}
      <div className='col-span-2 flex justify-start items-center gap-x-4 mb-4 mr-8 md:col-start-2 md:col-end-3 md:mb-0'>
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

        <p className='text-neutralGrayishBlue'>
          {convertTimeToRelative(comment.createdAt)}
        </p>
      </div>

      {/* content */}
      {isEdit ? (
        <TextArea content={editContent} setContent={setEditContent} />
      ) : (
        <p className='col-span-2 text-neutralGrayishBlue mb-4 md:row-span-2 md:mt-2'>
          {replyUser && (
            <span className='text-primaryModerateBlue font-bold'>
              {replyUser}
            </span>
          )}
          <span>{comment.content}</span>
        </p>
      )}

      {/* score */}
      <div className='col-span-1 flex flex-row items-center justify-around bg-neutralVeryLightGray text-lg font-medium w-24 h-10 rounded-md md:flex-col md:order-first md:row-span-3 md:w-10 md:h-24'>
        <button className='text-neutral-400 hover:text-primaryModerateBlue'>
          +
        </button>
        <span className='text-primaryModerateBlue'>{comment.score}</span>
        <button className='text-neutral-400 hover:text-primaryModerateBlue'>
          -
        </button>
      </div>

      {/* modify */}
      <div className='col-span-1 flex flex-row items-center justify-end text-lg gap-4 font-medium h-10 rounded-md md:col-end-4 md:row-start-1'>
        {comment.user.username === username ? (
          <>
            <button className='text-primarySoftRed' onClick={openModal}>
              <span className='flex items-center'>
                <MdDelete /> Delete
              </span>
            </button>
            <button
              className='text-primaryModerateBlue'
              onClick={() => setIsEdit(true)}
            >
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
