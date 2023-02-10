import React from 'react'

interface props {
  innerText: string
  bgColor: string
  customClassName?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  innerText,
  bgColor,
  customClassName,
  onClick,
  disabled,
}: props) => {
  return (
    <button
      className={`text-neutralWhite ${bgColor} rounded-lg min-w-fit px-6 py-3 ${customClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {innerText}
    </button>
  )
}

export default Button
