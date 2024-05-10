import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
    id:String,
    image:String,
    name:String
})

const moviesModel = mongoose.model('moviesModel', moviesSchema); 

export default {moviesModel}