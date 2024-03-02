const express=require('express')
const {createProduct,getSpecificProduct,getAllProduct,updateSpecificProduct,deleteSpecificProduct}=require('../services/productService')
const {getProductValidator,updateProductValidator,deleteProductValidator,createProductValidator}=require('../generel/validators/productValidator')
const {protect,allowedTo}=require('../services/authService')

const router=express.Router()
// router.use(protect,allowedTo("admin"))
router.route('/').post(protect,allowedTo("admin"),createProductValidator,createProduct).get(protect,allowedTo("user"),getAllProduct)
router.route('/:id').get(getProductValidator,getSpecificProduct).put(protect,allowedTo("admin"),updateProductValidator,updateSpecificProduct).delete(protect,allowedTo("admin"),deleteProductValidator,deleteSpecificProduct)

module.exports=router