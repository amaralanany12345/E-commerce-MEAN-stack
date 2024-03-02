const apiError=require('../generel/apiErrors');
const apiFeatures = require('../generel/apiFeatures');
// const apiFeatures=require('../generel/apiFeatures')

exports.createOne=(model)=>
    async(req,res,next)=>{
        const document=await model.create(req.body)
    res.status(201).json({data:document});
}

exports.getOne=(model)=>
    async(req,res,next)=>{
        const {id}=req.params
        const document=await model.findById(id)
        if(!document){
            return next (new apiError("document is not found",404))
        }
        res.status(200).json({data:document})
}

exports.getAll=(model)=>
async (req,res,next)=>{
    let filter= {}
    const counts=await model.countDocuments()

    const apiFeature=new apiFeatures(req.query,model.find(filter)).paginate(counts)
    const {mongooseQuery,paginationResult}=apiFeature

    const allDocument=await mongooseQuery

    res.status(201).json({data:allDocument})
}

exports.updateOne =(model)=>
async(req,res,next)=>{
    const {id}=req.params
    const document=await model.findByIdAndUpdate(id,req.body,{new:true})
    if(!document){
        return next (new apiError(`${document} is not found`,404))
    }
    res.status(200).json({data:document})
}

exports.deleteOne = (model)=>
    async (req,res,next)=>{
        const {id}=req.params
        const document= await model.findByIdAndDelete(id)
        if(!document){
            return next (new apiError(`${document} is not found`,404))
        }
        res.status(204).json("deleted")
    }
