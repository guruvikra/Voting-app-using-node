const express=require('express')
const app=express()
const bodyparser=require('body-parser')
require('dotenv').config()
const db=require("./db")
const userRoute=require("./routes/userRoutes")
const candidateRoute=require("./routes/candidateRoutes")

app.use(bodyparser.json())
const PORT=process.env.PORT ||3000



// this is for user routes 
// where we can get the
// - get  user profile
// - post add user
// - put user
// - post cast vote 
// - get see the votes count
app.use('',userRoute)


// this routes  is to only for admin role where the can add the candidate and update the candidate and delete the candidate and more
// -post add  candidate 
// -put candidate
// -delete candidate
// - get to see  the votes count


app.use('/addcandidate',candidateRoute)
app.listen(PORT,()=>{
    console.log("listening on port "+PORT)
})