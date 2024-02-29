import React,{useEffect} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axiosInstance from '../../utils/axios'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";


function Signup() {
    const navigate=useNavigate()
    const isAuthenticated=useSelector(state=>state.userData.isAuthenticated)
    const {values,handleBlur,handleChange,handleSubmit,errors,touched,}=useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
            password:'',
            cpassword:''
        },
        validationSchema:yup.object({
            name:yup.string().trim().required('Name is required'),
            email:yup.string().email('Invalid Email').required('E-mail is required'),
            phone:yup.string().matches(/^\d{10}$/, 'Enter valid Number').required('Enter the phone Number'),
            password:yup.string().min(6,'Password atleast 6 charecters').required("password is required"),
            cpassword:yup.string().oneOf([yup.ref('password')],'Password should match').required('confirm password is required')
        }),
        onSubmit:async (values, { setErrors })=>{
            try{
                await axiosInstance.post('/signup',values)
                navigate('/')
            }
            catch(err){
                if (err.response && err.response.status == 400) {
                    setErrors({ email: 'Email is already in use' });
                }
                console.log('error',err);
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
        {touched.name && <div>{errors.name}</div>}
        {touched.email && <div>{errors.email}</div>}
        {touched.phone && <div>{errors.phone}</div>}
        {touched.password && <div>{errors.password}</div>}
        {touched.cpassword && <div>{errors.cpassword}</div>}
      <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder='Username' name='name' value={values.name} onChange={handleChange}/>
      <input type="email" placeholder='E-mail'name='email'value={values.email} onChange={handleChange}/>
      <input type="tel" placeholder='Phone-Number'name='phone'value={values.phone} onChange={handleChange}/>
      <input type="password" placeholder='Password' name='password'value={values.password} onChange={handleChange}/>
      <input type="password" placeholder='Confirm Password' name='cpassword'value={values.cpassword} onChange={handleChange}/>
      <button type='submit'>Signup </button>
      already have an account? <Link to='/' style={{ textDecoration: 'none' }}>Signin</Link>
      </form>
    </div>
  )
}

export default Signup
