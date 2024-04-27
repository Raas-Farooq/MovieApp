import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import MoviesData from './fetchingData.js';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3003;
mongoose.connect('mongodb://localhost:27017/MoviesDb',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Mongoose Is Connected")
}).catch((err) => {
    console.log("Something has Gone Wrong: ", err);
})

const moviesSchema = new mongoose.Schema({
    id:String,
    image:String,
    detail:String
})

const moviesModel = mongoose.model('moviesModel', moviesSchema); 
let collection;

// search : 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=404e6e5185b680aad4b9021a88de3b27'


app.get('/onLoad', async(req,res) => {
    try{
        console.log("backend Runnng: ",MoviesData);
        res.json(MoviesData)
    }
    catch(err) {
        res.status(500).json({err:err.message})
    }
})

app.get('/getSearch', async(req,res) => {
    try{
        const search = req.query.search;
        console.log('Search inside Backend:', search);
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=404e6e5185b680aad4b9021a88de3b27`).
        then(response => response.json()).
        then(data => {
            let myMovies = [data];
            res.json(myMovies)
        }).
        catch(err =>console.log("got the Err:", err));
    }
    catch(err){
        console.log("Try FAiled: ", err);
        throw Error;
    }
})
app.listen(port, () => console.log("Submit Totally: ", port))