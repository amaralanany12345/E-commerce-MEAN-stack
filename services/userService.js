const userModel=require('../models/userModel')
const handler=require('./handlers')
const bcrypt=require('bcryptjs')
const apiError=require('../generel/apiErrors')
exports.createUser=handler.createOne(userModel)
exports.getAllUser=handler.getAll(userModel)
exports.getSpecificUser=handler.getOne(userModel)
exports.deleteUser=handler.deleteOne(userModel)

exports.changeUserPassword =async(req,res,next)=>{
    const {id}=req.params

    const document=await userModel.findByIdAndUpdate(id,{password:await bcrypt.hash(req.body.password,12)},{new:true})
    if(!document){
        return next (new apiError('user not exist',404))
    }
    document.unHashedPassword=req.body.password
    res.status(200).json({data:document})
}