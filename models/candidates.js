const mongoose=require('mongoose');


const CandidateSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    party:{
        type:String,
        required:true,
        upper:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:100
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }

    
},{timestamps:true});


const Candidate=mongoose.model('Candidate',CandidateSchema);
module.exports=Candidate;



