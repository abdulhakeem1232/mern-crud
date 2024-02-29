const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    img:{
        type:String,
    }
},{timestamps:true})

userSchema.pre('save', async function(next){

    const hashedPassword =  await bcrypt.hash(this.password, 10)
    this.password = hashedPassword

    next()
})

userSchema.methods.matchPassword=async function(eneteredpassword){
    return await bcrypt.compare(eneteredpassword,this.password)
}

const userModel=mongoose.model('users',userSchema)

module.exports=userModel