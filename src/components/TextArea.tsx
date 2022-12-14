import React from 'react'

interface props {
  content: string
  setContent: (content: string) => void
}

const TextArea = ({ content, setContent }: props) => {
  return (
    <textarea
      className='col-span-2 md:col-span-1 resize-none outline-neutralGrayishBlue text-neutralDarkBlue  outline outline-1 rounded-lg px-6 py-4 mb-4 md:mx-4 placeholder:text-neutralGrayishBlue'
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={3}
      placeholder='Add a comment...'
    ></textarea>
  )
}

export default TextArea
