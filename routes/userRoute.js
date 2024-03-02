const express=require('express')
const {createUser,getAllUser,getSpecificUser,deleteUser,changeUserPassword}=require('../services/userService')
const {getUSerValidator,deleteUserValidator,createUserValidator,changePasswordValidators}=require('../generel/validators/userValidator')
const {protect,allowedTo}=require('../services/authService')

const router=express.Router()
router.route('').post(allowedTo('admin'),createUserValidator,createUser).get(allowedTo('admin'),getAllUser)
router.route('/:id').get(allowedTo('admin'),getUSerValidator,getSpecificUser).delete(allowedTo('admin'),deleteUserValidator,deleteUser).put(protect,allowedTo('user'),changePasswordValidators,changeUserPassword)
module.exports=router