import React from 'react'

interface props {
  innerText: string
  bgColor: string
  onClick?: () => void
}

const Button = ({ innerText, bgColor, onClick }: props) => {
  return (
    <button
      className={`text-neutralWhite ${bgColor} rounded-lg px-6 py-2`}
      onClick={onClick}
    >
      {innerText}
    </button>
  )
}

export default Button
