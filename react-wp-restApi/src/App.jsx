import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/post/:id' element={<PostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
