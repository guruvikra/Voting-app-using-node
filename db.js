const mongoose=require('mongoose');

const db=mongoose.connect("mongodb://localhost:27017/myvotingApp").then(()=>{
    console.log("connected");
}).catch(err=>{
    console.log(err);
})



module.exports={
    db
}


