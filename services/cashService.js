const jwt=require('jsonwebtoken')
const cartModel=require('../models/cartModel')
const productModel=require('../models/productModel')
const apiError=require('../generel/apiErrors');
const userModel = require('../models/userModel');
const cashModel = require('../models/cashModel');

exports.createCashOrder=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is not found',404))
    }

    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user not found',404))
    }
    const cart =await cartModel.findById(req.params.id)
    if(!cart){
        return next (new apiError('cart is not found',404))
    }
    const cash = await cashModel.create({
        user:currentUser._id,
        totalPrice:cart.totalCartPrice,
        cartItems:cart.cartItems,
        isPaid:true,
        isDelivered:true,
    })

    if(cash){   
        const bulkOption=cart.cartItems.map((item)=>({
            updateOne:{
                filter:{_id:item.product},
                update:{$inc:{quantity:-item.quantity,sold:+item.quantity}}
            }
        }))

        await productModel.bulkWrite(bulkOption,{})
        await cartModel.findByIdAndDelete(req.params.id)
        // next()
    }
    res.status(201).json({data:cash})
}

exports.getAllOrder=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is not found',404))
    }

    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user not found',404))
    }

    const allOrders=await cashModel.find({})

    res.status(201).json({data:allOrders})
}

exports.getAllUserOrder=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next (new apiError('token is not found',404))
    }

    const decoded=jwt.verify(token,"abcdef")
    const currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user not found',404))
    }

    const allUserOrders=await cashModel.find({user:currentUser._id})
    if(!allUserOrders){
        return next (new apiError(`user doesn't have orders`,404))
    }
    res.status(200).json({data:allUserOrders})
}