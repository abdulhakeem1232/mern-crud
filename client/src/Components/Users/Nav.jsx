import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {logout} from '../../Redux/userSlice'

function Nav() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout=()=>{
        localStorage.removeItem('jwt');
        dispatch(logout())
        navigate('/')
      }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand href="#home">React-Crud</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text >
          <Link className="me-3" style={{ textDecoration: 'none' }} to='/profile'>Profile</Link>
          <button variant="link" onClick={handleLogout}>
      Logout
    </button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Nav
