const jwt=require('jsonwebtoken')
const cartModel=require('../models/cartModel')
const productModel=require('../models/productModel')
const apiError=require('../generel/apiErrors');
const userModel = require('../models/userModel');

exports.addCart = async(req,res,next)=>{
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
    const reqBodyOfCartItems=req.body.cartItems
    // const {productId,productPrice}=req.body
    const product=await productModel.findById(reqBodyOfCartItems[0].product)
    let cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        cart=await cartModel.create({
            user:currentUser._id,
            cartItems:[{product:reqBodyOfCartItems[0].product,price:product.price}]
        })
    }
    else {
        const productIndex=cart.cartItems.findIndex((item)=> item.product.toString()==reqBodyOfCartItems[0].product) 
        if(productIndex>-1){
            const cartITem=cart.cartItems[productIndex]
            cartITem.quantity++;
            cart.cartItems[productIndex]=cartITem
        }
        else
        {
            cart.cartItems.push({product:reqBodyOfCartItems[0].product,price:product.price})
        }
    }
    let total=0
    for(let i=0;i<cart.cartItems.length;i++){
        total+=cart.cartItems[i].price*cart.cartItems[i].quantity
    }
    cart.totalCartPrice=total
    await cart.save();
    res.status(201).json({data:cart})
}

exports.getUserCArt=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]

    }
    if(!token){
        return next (new apiError('token is invalid',404))
    }
    const decoded=jwt.verify(token,"abcdef")
    const  currentUser=await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user not found',404))
    }

    const cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        return next (new apiError('cart is not exist',404))
    }
    res.status(200).json({data:cart})
}

exports.clearCart= async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }
    
    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    await cartModel.findOneAndDelete({user:currentUser._id})
    res.status(204).send("deleted")
    
}

exports.deleteSpecificItem=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }
    
    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    const cart= await cartModel.findOneAndUpdate({user:currentUser._id},{$pull:{cartItems:{_id:req.params.itemId}}},{new:true}) 
    let total=0
    for(let i=0;i<cart.cartItems.length;i++){
        total+=cart.cartItems[i].price*cart.cartItems[i].quantity
    }

    cart.totalCartPrice=total
    await cart.save();
    res.status(200).json({data:cart})
}

exports.updateItemQuantity=async(req,res,next)=>{
    let token;
    if(req.headers.authorization){
        token=req.headers.authorization.split(" ")[1]
    }
    if(!token){
       return next (new apiError ("token is invalid",401))
    }
    
    const decoded = jwt.verify(token,"abcdef")
    const currentUser= await userModel.findById(decoded.userId)
    if(!currentUser){
        return next (new apiError('user not found',404))
    }
    const cart=await cartModel.findOne({user:currentUser._id})
    if(!cart){
        return next (new apiError('cart is not found',404))
    }
    // const {quantity}=req.body
    let itemIndex=cart.cartItems.findIndex((item)=>item.product.toString()==req.params.itemId)
    if(itemIndex>-1){
        const cartItem=cart.cartItems[itemIndex]
        cartItem.quantity=req.body.quantity
        cart.cartItems[itemIndex]=cartItem
    }
    else {
        return next (new apiError(`there is no item for this id ${currentUser._id}`,404))
    }
    let total=0;
   
    for(let i=0;i<cart.cartItems.length;i++){
        total+=cart.cartItems[i].quantity * cart.cartItems[i].price
    }
    cart.totalCartPrice=total
   
    await cart.save();
    res.status(201).json({data:cart})
}