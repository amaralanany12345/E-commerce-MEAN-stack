const mongoose=require('mongoose')
const categoryModel=require('../models/categoryModel')
const handlers=require('../services/handlers')

exports.createCategory=handlers.createOne(categoryModel)
exports.getSpecificCategory=handlers.getOne(categoryModel)
exports.getAllCategory=handlers.getAll(categoryModel)
exports.updateSpecificCategory=handlers.updateOne(categoryModel)
exports.deleteSpecificCategory=handlers.deleteOne(categoryModel)