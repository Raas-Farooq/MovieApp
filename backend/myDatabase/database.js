import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('befor mongo Connection MONGODB_URI:', process.env.MONGODB_URI);

const fight = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(() => {
            console.log("is Mongoose Connected")
        }).catch((err) => {
            console.log("Something has Gone Wrong: ", err);
        })
    }
   catch(err){
    res.status(404).json({message:err})
   }

}

export default {fight}

