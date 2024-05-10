import mongoose from 'mongoose';


const fight = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/MoviesDb',
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

