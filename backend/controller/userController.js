const asyncHandler= require('express-async-handler')
const user=require('../Models/UserModel')
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')



const registerUser= asyncHandler(async(req,res)=>{
    console.log(req.body,'lll');
    let { name, email, phone, password } = req.body;
  const existingUser = await user.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email is already in use" });
  }
  const userData = await user.create({
    name,
    email,
    phone,
    password
  });
  if (userData) {
    res.status(201).json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
    });
    console.log('created');
  } else {
    res.status(400);
    throw new Error();
  }
})

const loginUser=async(req,res)=>{
  try {
  const {email,password}=req.body
  const login=await user.findOne({email:email})
  if(login && await login.matchPassword(password)){

    const token=jwt.sign({userId:login._id},process.env.SECRET_KEY, { expiresIn: '1h' })
    console.log(token);
    res.cookie('jwt', token, {  httpOnly: true, secure: false,sameSite:'strict', maxAge: 3600000 });
    console.log(login,'llp',login.isAdmin);
    return res.status(200).json({
      token,
      _id: login._id,
      isAdmin:login.isAdmin|| false,
      name: login.name,
      img:login.img|| null,
      email: login.email,
      phone:login.phone,
    });
  }
 else {
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
}
} catch (error) {
  console.error('Error during login:', error);
  return res.status(500).json({ success: false, message: 'Internal server error' });
}
}

const profileuploaded=async(req,res)=>{
  try{
    const id = req.params.id.replace(/"/g, ''); 
    console.log('kk',id);
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   console.log('oo');
    //   return res.status(400).json({ message: "Invalid user ID" });
    // }
    console.log('cook',req.cookies.jwt,'cook');
    console.log('Request Cookies:', req.cookies);
    // console.log(req.body,'body',req.file,'req');
    const login = await user.findById(id);
    const {img}=req.body
    // console.log(login,'login');
    if (login) {
      console.log('if',img);
      let result=await user.updateOne({_id:id},{$set:{img:img}});
      // console.log(result,'lll');
      let updatedUser=await user.findById(id)
      // console.log(updatedUser.img,'iilll');
      res.status(201).json({
        img: updatedUser.img,
      });
    } else {
      console.log('ee');
      res.status(404).json({ message: 'User Not Found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}





module.exports={registerUser,loginUser,profileuploaded}