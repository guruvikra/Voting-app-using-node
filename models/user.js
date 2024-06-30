const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:100
    },
    email:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
    },
    aadharCardNumber:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin', 'voter'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        // select:false
    }
    
},{timestamps:true});


// userSchema.pre('save',async function(next){
//     const user=this
//     if(!user.isModified('password')) return next();

//     try {
//         const salt=await bcrypt.genSalt(10);
//         const hashedpassword=await bcrypt.hash(user.password,salt);
//         user.password=  hashedpassword;

//         next();

        
//     } catch (error) {
//         return next(error);
        
//     }

//   })
// userSchema.methods.comparePassword=async function(pass){
// try{
//     const password=this.password
// const isMatch=await bcrypt.compare(pass,password)
// return isMatch;
// }
// catch(err){
//     throw err;
// }
// }

const User=mongoose.model('User',userSchema);
module.exports=User;



