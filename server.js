const express=require('express')
const app=express()
const bodyparser=require('body-parser')
require('dotenv').config()

app.use(bodyparser.json())
const PORT=process.env.PORT ||3000


app.listen(PORT,()=>{
    console.log("listening on port "+PORT)
})