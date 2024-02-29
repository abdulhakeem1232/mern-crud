const asyncHandler= require('express-async-handler')
const user=require('../Models/UserModel')
const jwt=require('jsonwebtoken');

const loginAdmin=async(req,res)=>{
    try {
    const {email,password}=req.body
    console.log(req.body);
    const login=await user.findOne({email:email})
    // console.log('l',login,login.isAdmin,login.name);
    if(login && await login.matchPassword(password) && login.email=='aadmin@gmail.com'){
  
      const token=jwt.sign({userId:login._id},process.env.SECRET_KEY, { expiresIn: '1h' })
      console.log(token);
      res.cookie('jwt', token, {  httpOnly: true, secure: true, maxAge: 3600000 });
      console.log(login,'llp',login.isAdmin);
      return res.status(200).json({
        token,
        _id: login._id,
        isAdmin:login.isAdmin,
        name: login.name,
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

  const getuser=async(req,res)=>{
    try{

        const data=await user.find({email:{$ne:"aadmin@gmail.com"}})
       return res.status(200).json({ data: data });
    }catch(error){
        console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

const searchUser=async(req,res)=>{
    try{
    const {name}=req.body
    const data=await user.find({name:{$regex: new RegExp(name, "i")}})
    return res.status(200).json({ data: data });
}catch(error){
    console.error('Error:', error);
return res.status(500).json({ success: false, message: 'Internal server error' });
}
}

const deleteUser=async(req,res)=>{
try{
    const userid=req.params.id;
    const userDelete=await user.findByIdAndDelete(userid)
    return res.status(200).json({ msg: 'deleted' });
}catch(err){
    console.log(err);
}
}
const updateUser=async(req,res)=>{
  try{
  const id=req.params.id;
  const {name,phone}=req.body.formData
  console.log(id,name,phone,req.body);
  const updated=await user.updateOne({_id:id},{$set:{name:name,phone:phone}})
  const data=await user.find({email:{$ne:"aadmin@gmail.com"}})
  return res.status(200).json({ data:data });
  }
  catch(err){
    console.log(err);
  }

}
const adduser=async(req,res)=>{
  console.log(req.body);
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
}

  module.exports={
    loginAdmin,getuser,searchUser,deleteUser,updateUser,adduser
  }