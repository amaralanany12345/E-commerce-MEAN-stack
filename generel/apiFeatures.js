class apiFeatures {
    constructor(queryString,mongooseQuery){
        this.queryString=queryString
        this.mongooseQuery=mongooseQuery
    }

    paginate(currentDocument){
        const page=this.queryString.page*1;
        const limit=this.queryString.limit
        const skip= (page-1)*limit
        const endIndex=page*limit


        const pagination={}
        pagination.currentPage=page
        pagination.limit=limit
        pagination.numOgPages=Math.ceil(currentDocument/limit)

        if(endIndex<currentDocument){
            pagination.next=page-1
        }

        if(skip>0){
            pagination.prev=page - 1
        }

        
        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit)
        this.paginationResult=pagination

        return this
    }
}

module.exports=apiFeatures