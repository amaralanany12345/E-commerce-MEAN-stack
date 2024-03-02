const express=require('express')
const {createCategory,getSpecificCategory,getAllCategory,updateSpecificCategory,deleteSpecificCategory}=require('../services/categoryService')
const router=express.Router()

router.route('/').post(createCategory).get(getAllCategory)
router.route('/:id').get(getSpecificCategory).put(updateSpecificCategory).delete(deleteSpecificCategory)

module.exports=router
