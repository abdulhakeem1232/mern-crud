import React,{useEffect} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from '../../utils/axios';
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import {login} from '../../Redux/userSlice'
import { useDispatch,useSelector } from "react-redux";



function Login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const isAuthenticated=useSelector(state=>state.userData.isAuthenticated)
  const {values,handleChange,handleSubmit,errors,touched}=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:yup.object({
      email:yup.string().email('Invalid Email').required('E-mail is required'),
      password:yup.string().required("Password is required")
    }),
    onSubmit:async (values,{setErrors})=>{
     try{
      const response=await axiosInstance.post('/login',values)  
      // Cookies.set('token', response.data.token);
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      localStorage.setItem("id", JSON.stringify(response.data._id));
      localStorage.setItem("img", JSON.stringify(response.data._img));
      console.log(response.data,'ll');
      dispatch(login(response.data))
      // let jwt=localStorage.getItem('jwt')
      // let decodedjwt=JSON.parse(jwt)
      // console.log('lop',decodedjwt);
      navigate('/home')
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
     }catch(err){
      if (err.response && err.response.status == 401) {
        setErrors({ email: 'invalid creadentials' });
    }
     }
    }
  })
useEffect(()=>{
  if (isAuthenticated) {
    navigate('/home',{ replace: true });
  }
},[])

  return (
    <div>
    {touched.email && <div>{errors.email} </div>}
    {touched.password && <div>{errors.password} </div>}
        <form action="" onSubmit={handleSubmit}>
      <input type="email" placeholder='E-mail' name='email' onChange={handleChange} value={values.email}/>
      <input type="password" placeholder='Password' name='password' onChange={handleChange} value={values.password}/>
      <button type='submit'>Login</button>
      </form>
      create new account? <Link to='/signup' style={{ textDecoration: 'none' }}>SignUp</Link>
    </div>
  )

}
export default Login
