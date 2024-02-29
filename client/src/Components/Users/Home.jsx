import React,{useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Nav from './Nav';
import {useSelector,useDispatch} from 'react-redux';
import { checkUserAuthentication } from '../../Redux/userSlice';

function Home() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const isAuthenticated=useSelector(state=>state.userData.isAuthenticated)
  useEffect(()=>{
    dispatch(checkUserAuthentication())
    if (!isAuthenticated) {
      navigate('/',{ replace: true });
    }
  },[])
  return (
    <div>
      <Nav></Nav>
      Welcome to Home User
    </div>
  )
}

export default Home
