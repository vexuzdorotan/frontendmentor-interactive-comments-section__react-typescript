import './App.css'

import { CommentsProvider } from './contexts/CommentsContext'
import { UserProvider } from './contexts/UserContext'
import Comments from './components/Comments'

const App = () => {
  return (
    <UserProvider>
      <CommentsProvider>
        <div className='min-h-screen py-16 bg-neutralVeryLightGray'>
          <Comments />
        </div>
      </CommentsProvider>
    </UserProvider>
  )
}

export default App
