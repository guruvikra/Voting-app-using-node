const express=require('express')
const router=express.Router()
const User=require("../models/user")
const Candidate=require("../models/candidates")

const{generateToken, jwtAuthMiddleware}=require("../jwt")


router.post('/signup',async(req,res)=>{
    try{
        const data=req.body;
        const newUser=new User(data)
        const response=await newUser.save()
        console.log("Saved");

        const payload={
            id:response.id
        }

        const token=generateToken(payload)
        console.log("token : ",token);

        res.status(200).json({response:response,token:token})

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error",err:err})

    }
})



router.post('/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {aadharCardNumber, password} = req.body;

        // Check if aadharCardNumber or password is missing
        if (!aadharCardNumber || !password) {
            return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
        }

        // Find the user by aadharCardNumber
        const user = await User.findOne({aadharCardNumber: aadharCardNumber})
        if(!user){
            return res.status(401).json({ error: 'Invalid Aadhar Card Number or Password' });
        }
        if(password!==user.password){
            return res.status(401).json({ error: 'Invalid Aadhar Card Number or Password' });
        }
        console.log(user);
        console.log(password);
        console.log(user.password);

        // generate Token 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get("/profile",jwtAuthMiddleware,async(req,res)=>{
try{
    // const userData = req.user;
    //     const userId = userData.id;
    console.log(req.user);
    const user=await User.findById(req.user.id);
    console.log(user);  
    res.status(200).json({user:user})

}
catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Server Error"})
}
})

router.put("/profile/resetpassword",jwtAuthMiddleware,async(req,res)=>{
    try{
        const userid=req.user.id;
        console.log(userid);
        const {newpassword,currpassword}=req.body
        if(newpassword==null||currpassword==null){
            return res.status(400).json({error:"Password and Current Password are required"})

        }

        console.log(currpassword);
        const user=await User.findById(userid);
        console.log(user.password);
        console.log("_____");
        if(user.password!==currpassword){
            return res.status(401).json({error:"Incorrect Password you cannot update your password"})
        }

        user.password=newpassword;
        await user.save()
        res.status(200).json({message:"Password Updated Successfully",updateduser:user})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.post('/vote/:candidateId',jwtAuthMiddleware,async(req,res)=>{
    candidateid=req.params.candidateId
    userid=req.user.id

    try {
        const candidate=await Candidate.findById(candidateid)
        const user=await User.findById(userid)
        if(!candidate){
            return res.status(404).json({error:"Candidate Not Found"})
        }
        if(user.role=="admin"){
            return res.status(401).json({error:"Admins cannot vote"})
        }
        if(user.isVoted){
            return res.status(400).json({error:"User has already voted"})
        }

        candidate.votes.push({user:userid})
        candidate.voteCount++;
        await candidate.save()


        user.isVoted=true
        await user.save()
        res.status(200).json({message:"Vote Casted Successfully",updatedcandidate:candidate, updateduser:user})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


router.get('/vote/count',async(req,res)=>{
    try{
        const candidates=await Candidate.find().sort({voteCount:'desc'})

        const totalvotes=candidates.map((data)=>{
            return {
                party: data.party,
                voteCount: data.voteCount
            }
        })
        return res.status(200).json(totalvotes)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})
module.exports=router