import React from 'react'

import IComment, { IReplies } from '../@types/comment'
import TextArea from './TextArea'

interface props {
  comment: IComment | IReplies
  isEdit: boolean
  replyUser: string
  editedContent: string
  setEditedContent: React.Dispatch<React.SetStateAction<string>>
}

const Content = ({
  comment,
  isEdit,
  replyUser,
  editedContent,
  setEditedContent,
}: props) => {
  return (
    <>
      {isEdit ? (
        <div className='flex flex-col col-span-2  md:mt-4'>
          <TextArea content={editedContent} setContent={setEditedContent} />
        </div>
      ) : (
        <p
          className='col-span-2 text-neutralGrayishBlue mb-4 md:row-span-2 md:mt-2'
          aria-label='User Comment'
        >
          {replyUser && (
            <span className='text-primaryModerateBlue font-bold'>
              {replyUser}
            </span>
          )}
          <span>{comment.content}</span>
        </p>
      )}
    </>
  )
}

export default Content
