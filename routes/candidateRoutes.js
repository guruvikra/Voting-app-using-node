const express=require('express')
const router=express.Router()
const Candidate=require("../models/candidates")
const User=require("../models/user")


const{generateToken, jwtAuthMiddleware}=require("../jwt")


const isAdmin=async (userId)=>{
    try{
        const user=await User.findById(userId)
        if(user.role === 'admin'){
            return true;
        }
        
    }
    catch(err){
        return false;
    }
}

router.post('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        if(!(await isAdmin(req.user.id))){
            return res.status(403).json({error:"Unauthorized Access",message:"Only admin can access this route"})
        }
        const data=req.body;
        const candidate=new Candidate(data)
        const response=await candidate.save()
        console.log("Saved");

        res.status(200).json({response:response})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error",err:err})

    }
})
router.put('/:candidateId',jwtAuthMiddleware,async function(req,res){
    try{

        if(!(await isAdmin(req.user.id))){
            return res.status(403).json({error:"Unauthorized Access",message:"Only admin can access this route"})
        }
        
        const candidateid=req.params.candidateId
        const updatedCandidate=req.body;
        const response=await Candidate.findByIdAndUpdate(candidateid,updatedCandidate,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:"Candidate Not Found"})
        }
        res.status(200).json({message:"candidate Updated Successfully",updated:response})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }

    })

    router.delete('/:candidateId',jwtAuthMiddleware,async function(req,res){
        try{
    
            if(!(await isAdmin(req.user.id))){
                return res.status(403).json({error:"Unauthorized Access",message:"Only admin can access this route"})
            }
            
            const candidateid=req.params.candidateId
            const updatedCandidate=req.body;
            const response=await Candidate.findByIdAndDelete(candidateid,updatedCandidate,{
                new:true,
                runValidators:true
            })
            if(!response){
                return res.status(404).json({error:"Candidate Not Found"})
            }
            res.status(200).json({message:"candidate deleted Successfully",updated:response})
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:"Internal Server Error"})
        }
    
        })
module.exports=router