const {check}=require('express-validator')

const validationMiddleWare=require('../../middleWare/validatorsMiddleWare')
const { isLength } = require('validator')

exports.getProductValidator=[
    check('id').isMongoId().withMessage("invalid product id"),
    validationMiddleWare
]

exports.updateProductValidator=[
    check('id').isMongoId().withMessage('invvalid product id'),
    validationMiddleWare
]
exports.deleteProductValidator=[
    check('id').isMongoId().withMessage('invvalid product id'),
    validationMiddleWare
]

exports.createProductValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isLength({min:3}).withMessage('too short name')
    .isLength({max:32}).withMessage('too long name'),
    validationMiddleWare
]