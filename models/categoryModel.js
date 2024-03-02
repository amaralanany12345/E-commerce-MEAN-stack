const mongoose =require('mongoose')
 const categorySchema=new mongoose.Schema({
    name:{
            type:String,
            required:[true,'name of category is required'],
            minLength:[3,'too short name'],
            maxLength:[32,'too long name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    image:String
 },{timestamps:true})

module.exports=mongoose.model('category',categorySchema)
