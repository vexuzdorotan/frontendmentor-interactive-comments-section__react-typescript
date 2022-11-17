import React, { useState } from 'react'

import './App.css'

import currentUserAPI from './shared/api/currentUser'

import Comments from './components/Comments'

const App: React.FC = () => {
  return (
    <div className='min-h-screen bg-neutralVeryLightGray'>
      <Comments />
    </div>
  )
}

export default App
