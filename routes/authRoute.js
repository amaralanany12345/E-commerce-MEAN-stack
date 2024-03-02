const express=require('express')
const {login,signUp}=require('../services/authService')
const {signUpValidator,loginValidator}=require('../generel/validators/authValidator')
const router=express.Router()

router.route('/login').post(loginValidator,login)
router.route('/signup').post(signUpValidator,signUp)
module.exports=router