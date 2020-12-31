class HttpError extends Error{
    constructor(message,errorCode){
        super(message) //this will create a message property
        this.code=errorCode
    }
    }
module.exports=HttpError