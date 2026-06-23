import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/pages/Home'
import CompleteProfile from './components/auth/CompleteProfile'
import Todos from './components/pages/Todos'
import Info from './components/pages/Info'
import Posts from './components/pages/Posts'
import Albums from './components/pages/Albums'
import Photos from './components/pages/Photos'
import Comments from './components/pages/Comments'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/users/:userId/home" element={<Home />} />
        <Route path="/users/:userId/todos" element={<Todos />} />
        <Route path="/users/:userId/info" element={<Info />} />
        <Route path="/users/:userId/posts" element={<Posts />} />
        <Route path="/users/:userId/albums" element={<Albums />} />
        <Route path="/users/:userId/albums/:albumId/photos" element={<Photos />} />
        <Route path="/photos/:albumId" element={<Photos />} />
        <Route path="/users/:userId/posts/:postId/comments" element={<Comments />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App