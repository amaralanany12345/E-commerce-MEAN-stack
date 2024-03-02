const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name of product is required'],
        minLength:[3,'too short name'],
        maxLength:[32,'too long name'],
    },
    price:{
        type:Number,
        required:[true,'price of product is required'],
        min:[20,'too short'],
        max:[50000,'too long'],
    },
    quantity:{
        type:Number,
        required:[true,'quantity of product is required'],
    },
    discription:{
        type:String,
        required:[true,"product discription is required"],
        minLength:[3,'min length is 3 '],
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category'
    },
    image:String
},{timestamps:true})

module.exports=mongoose.model('product',productSchema)