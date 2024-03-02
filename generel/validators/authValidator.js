const {check}=require('express-validator')
const bcrypt=require('bcryptjs')
const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')
const userModel = require('../../models/userModel')

exports.signUpValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isLength({min:3}).notEmpty().withMessage('too short name')
    .isLength({max:32}).notEmpty().withMessage('too long name'),

    check('email').notEmpty().withMessage('email is reauired')
    .isEmail().withMessage('email is invalid'),
    
    check('password').notEmpty().withMessage('passowrd is required')
    .isLength({min:6}).withMessage('too short passowrd'),
    // .custom((val,{req})=>{
    //     if(val!=req.body.passwordConfirm){
    //         throw new Error('password confirmation is not correct')
    //     }

    //     return true
    // }),
    // check('passwordConfirm').notEmpty().withMessage('passowrd confirm is required'),
    validationMiddleWare
]

exports.loginValidator=[
    check('email').notEmpty().withMessage('User required')
    .isEmail().withMessage('invalid eamil address'),

    check('password').notEmpty().withMessage('required password')
    .isLength({min:6}).withMessage('password must be 6 at least'),
    validationMiddleWare
]