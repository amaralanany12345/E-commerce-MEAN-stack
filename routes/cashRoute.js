const express=require('express')
const {createCashOrder,getAllOrder,getAllUserOrder}=require('../services/cashService')
const {protect,allowedTo}=require('../services/authService')
const router=express.Router()
router.route('').get(protect,allowedTo('admin'),getAllOrder)
router.route('/userOrder').get(protect,allowedTo('user'),getAllUserOrder)
router.route('/:id').post(protect,allowedTo('user'),createCashOrder)
module.exports=router