import './App.css'

import { CommentsProvider } from './contexts/CommentsContext'
import Comments from './components/Comments'

const App = () => {
  return (
    <CommentsProvider>
      <div className='min-h-screen bg-neutralVeryLightGray'>
        <Comments />
      </div>
    </CommentsProvider>
  )
}

export default App
