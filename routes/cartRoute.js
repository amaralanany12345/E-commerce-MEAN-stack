const express=require('express')
const {addCart,getUserCArt,deleteSpecificItem,clearCart,updateItemQuantity}=require('../services/cartService')
const {protect,allowedTo}=require('../services/authService')
const router=express.Router()
router.use(protect,allowedTo('user'))
router.route('/').post(addCart).get(getUserCArt).delete(clearCart)
router.route('/:itemId').delete(deleteSpecificItem).put(updateItemQuantity)
module.exports=router
