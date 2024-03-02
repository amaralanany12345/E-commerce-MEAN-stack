const {check}=require('express-validator')
const bcrypt=require('bcryptjs')
const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')
const userModel = require('../../models/userModel')

exports.getUSerValidator=[
    check('id').isMongoId().withMessage('id is invalid'),
    validationMiddleWare
]

exports.updateUserValidator=[
    check('id').isMongoId().withMessage('id is not valid'),
    validationMiddleWare
]

exports.deleteUserValidator=[
    check('id').isMongoId().withMessage('id is not valid'),
    validationMiddleWare
]

exports.createUserValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isLength({min:3}).withMessage('too short name')
    .isLength({max:32}).withMessage('too long name'),
    check('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('email is not valid'),
    check('password').notEmpty().withMessage('password is reqiored')
    .isLength({min:6}).withMessage('too short password'),
    check('phone').isMobilePhone("ar-EG").withMessage('invalid egyptian number')
    ,validationMiddleWare
]

exports.changePasswordValidators=[
    check('id').notEmpty().withMessage('id is invalid'),
    check('currentPassword').notEmpty().withMessage('current password is required'),
    check('passwordConfirm').notEmpty().withMessage('password confirm is required'),
    check('password').notEmpty().withMessage('password is required').custom(async(val,{req})=>{
        const user=await userModel.findById(req.params.id)
        if(!user){
            throw new Error('user is not found')
        }

        const isCorrectPassword=await bcrypt.compare(req.body.currentPassword,user.password)
        if(!isCorrectPassword){
            throw new Error('not correct password')
        }
        if(val!=req.body.passwordConfirm){
            throw new Error('password confirmation is invalid')
        }

        return true

    }),
    validationMiddleWare
]
