import React from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import axiosInstance from '../../utils/axios';
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../../Redux/userSlice'
import store from '../../Redux/store'
import { useDispatch,useSelector } from "react-redux";

function Adlogin() {
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
          const response=await axiosInstance.post('/admin/adlogin',values)  
          localStorage.setItem("jwt", JSON.stringify(response.data.token));
          console.log(response.data,'ll');
          dispatch(login(response.data))
          let jwt=localStorage.getItem('jwt')
          let decodedjwt=JSON.parse(jwt)
          console.log('lop',decodedjwt);
          navigate('/admin/dashboard')
         }catch(err){
          if (err.response && err.response.status == 401) {
            setErrors({ email: 'invalid creadentials' });
        }
         }
        }
      })
  return (
    <div>
        {touched.email && <div>{errors.email} </div>}
    {touched.password && <div>{errors.password} </div>}
    <form action="" on onSubmit={handleSubmit}>
      <h1>Admin Login</h1>
       <input type="email" placeholder='E-mail' name='email' onChange={handleChange} value={values.email}/>
      <input type="password" placeholder='password' name='password' onChange={handleChange} value={values.password}/>
      <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Adlogin
