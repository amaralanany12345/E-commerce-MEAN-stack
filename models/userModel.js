const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of user is required']
    },
    email:{
        type:String,
        required:[true,'email of user is required']
    },
    password:{
        type:String,
        minLength:[6,"too  short password"],
        required:[true,'password of user is required']
    },
    unHashedPassword:String,
    phone:{
        type:String,
    },
    image:String,
    passwordChangedAt:Date,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

},{timestamps:true})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12)
    next();
})
module.exports=mongoose.model('user',userSchema)