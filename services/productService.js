const mongoose=require('mongoose')
const productModel=require('../models/productModel')
const handlers=require('./handlers')

exports.createProduct=handlers.createOne(productModel)
exports.getSpecificProduct=handlers.getOne(productModel)
exports.getAllProduct=handlers.getAll(productModel)
exports.updateSpecificProduct=handlers.updateOne(productModel)
exports.deleteSpecificProduct=handlers.deleteOne(productModel)