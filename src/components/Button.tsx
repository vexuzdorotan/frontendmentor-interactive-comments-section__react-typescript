import React from 'react'

interface props {
  innerText: string
  bgColor: string
  customClassName?: string
  onClick?: () => void
}

const Button = ({ innerText, bgColor, customClassName, onClick }: props) => {
  return (
    <button
      className={`text-neutralWhite ${bgColor} rounded-lg min-w-fit px-8 py-3 ${customClassName}`}
      onClick={onClick}
    >
      {innerText}
    </button>
  )
}

export default Button
