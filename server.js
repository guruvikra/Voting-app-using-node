const express=require('express')
const app=express()
const bodyparser=require('body-parser')
require('dotenv').config()
const db=require("./db")
const userRoute=require("./routes/userRoutes")
const candidateRoute=require("./routes/candidateRoutes")

app.use(bodyparser.json())
const PORT=process.env.PORT ||3000

app.use('',userRoute)
app.use('/addcandidate',candidateRoute)
app.listen(PORT,()=>{
    console.log("listening on port "+PORT)
})