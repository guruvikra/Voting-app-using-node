// const e = require('express')
const jwt=require('jsonwebtoken')


const jwtAuthMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader){
        return res.status(401).json({error:'No token provided'})
    }
    const token=authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({error:'Token not found'})
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRETKEY);
        console.log(decode);
        req.user=decode
        // console.log(req.da);
        next()
    }

    catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid Token"})
    }
}


const generateToken = (user)=>{
    return jwt.sign(user,process.env.JWT_SECRETKEY,{expiresIn:30000})
}


module.exports={
    jwtAuthMiddleware,
    generateToken,
 
}