import react from 'react'
import './App.css'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import Dashboard from './components/Dashboard'
import AllTodo from './components/AllTodo'
import Allusers from './components/Allusers'
import AddTodo from './components/AddTodo'
import EditTodo from './components/EditTodo'
import AuthComponent from './components/AuthComponent'
import UserTodo from './components/UserTodo'

function App() {

  // const isloggedin = !!localStorage.getItem('token')

  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route element={<AuthComponent />}>

            <Route path='/' element={<AllTodo />} />
            <Route path='/addtodo' element={<AddTodo />} />
            <Route path='/edittodo/:id' element={<EditTodo />} />
            <Route path='/allusers' element={<Allusers />} />
            <Route path='/usertodo' element={<UserTodo />} />

          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={1000} transition={Zoom} />

    </>
  )
}

export default App
