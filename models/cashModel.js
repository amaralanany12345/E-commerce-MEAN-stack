const mongoose=require('mongoose')
const cashSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:[true,'user is required'],
        ref:"user"
    },
    totalPrice:{
        type:Number
    },
    cartItems:[{
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }],
    taxPrice:{
        type:Number,
        default:0
    },
    shippingPrice:{
        type:Number,
        default:0
    },
    paymentType:{
        type:String,
        enum:['cash','card']
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliverdAt:Date

},{timestamps:true})

module.exports=mongoose.model('cash',cashSchema)