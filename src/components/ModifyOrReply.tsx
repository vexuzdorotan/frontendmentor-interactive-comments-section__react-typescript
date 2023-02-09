import React, { useState } from 'react'

import ReactModal from 'react-modal'
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaReply } from 'react-icons/fa'

import IComment, { IReplies } from '../@types/comment'
import { useContextComments } from '../contexts/CommentsContext'

import Button from './Button'

interface props {
  comment: IComment | IReplies
  username: string
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  handleReply: () => void
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

const ModifyOrReply = ({
  comment,
  username,
  isEdit,
  setIsEdit,
  handleReply,
}: props) => {
  const { dispatch } = useContextComments()

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleDelete = async () => {
    dispatch({
      type: 'DELETE_COMMENT',
      payload: { id: comment.id },
    })

    closeModal()
  }

  return (
    <>
      <div
        className={`${
          isEdit ? 'hidden ' : ''
        }col-span-1 flex flex-row items-center justify-end text-lg gap-4 font-medium h-10 rounded-md md:col-end-4 md:row-start-1`}
      >
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
          <button className='text-primaryModerateBlue' onClick={handleReply}>
            <span className='flex items-center'>
              <FaReply className='mr-2' /> Reply
            </span>
          </button>
        )}
      </div>

      <ReactModal
        isOpen={isOpen}
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
    </>
  )
}

export default ModifyOrReply
