
import MoviesData from '../fetch/fetchingData.js';
import mongoose from 'mongoose';
import movies from '../models/moviesModel.js';
import fetch from 'node-fetch';
import {ObjectId} from 'mongoose';

const loadAll = async (req,res) => {
   
        let myObj;
        try{
    
            const moviesList = await movies.moviesModel.find({});
            console.log("movies List length: ", moviesList.length);
            if(moviesList.length){
                await movies.moviesModel.deleteMany({
                    $or:[{
                        image:null
                    }]
                })
                
                for(const success of moviesList) {
                    if(!success.image){
                        // console.log("File Path err")
                    }
                    else if(success.image && !success.image.includes('/')){
                        console.log("Wrong Img");
                        const {name, image} = success;
                        const id = success.id;
                        console.log("Id of Wrong Img: ",id);
                        const movie = movies.moviesModel.findOne({id});
                        const newImage = success.name;
                        const newName = success.image;
                        // let correctId = mongoose.Types.ObjectId(id);
                        const updated = await movies.moviesModel.findByIdAndUpdate({_id: success._id},
                             {$set:{name:image, image:name}}, {new:true});
                        console.log("updated ", updated);
                        if(updated){
                            console.log(`successfully updated Image: ${newImage} and Name :${newName} `);
                        }
                        else{
                            console.log(`Unable To Update`);
                        }
                       
                    }
                 }
                res.json(moviesList)
            }
            else
            {
                let promises = [];
    
                for(let i=0; i < MoviesData.length; i++){
                    MoviesData[i].results.forEach( (success) => {
                    myObj = [{
                        id: success.id,
                        name:success.title,
                        image: success.backdrop_path
                        
                    }]
                        promises.push(moviesModel.insertMany(myObj));
                    })
                }
                await Promise.all(promises);
                
                const allMovies = await movies.moviesModel.find({});
    
                console.log("New All Movies Model: ",allMovies);
                
                res.json(allMovies)
            }
            
        }
        catch(err) {
            res.status(500).json({err:err.message})
        }
}

const deleteMovie = async (req,res) => {
    try{
        const id = req.query.id;
        console.log("id passed: ", id);
        const movie = await movies.moviesModel.findOne({_id:id});
        if(!movie){
            console.log("Id not found");
            res.json({message:"Believe and Send another ID"})
        }
        else{
            const deleted = await movies.moviesModel.deleteOne({_id:id});
            console.log("what is deleted", deleted)
            if(deleted){
                console.log("Believe in Allah(SWT) ")
            }
            else{
                console.log("You might have Weak Faith")
            }
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}
const searching = async (req,res) => {

        try{
            const search = req.query.search;
            console.log('Search inside Backend:', search);
            fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=404e6e5185b680aad4b9021a88de3b27`).
            then(response => response.json()).
            then(data => {
                let myMovies = [data];
                console.log("myMovies: Search: ", myMovies)
                res.json(myMovies)
            }).
            catch(err =>console.log("Searching Err:", err));
        }
        catch(err){
            console.log("Try FAiled: ", err);
            throw Error;
        }
        
}

// Adding MOvie
const addMovie = async (req, res) => {

    try{
        const body = req.body;
        console.log("Just see the Body of item: ", body);
        // const found = await moviesModel.findOne({id});
        
        // if(found){
        //     res.send({message:"Id is already Assigned"})
        // }
        // else
        // {
            // const allMovies = await movies.moviesModel.find({});
            const added = await movies.moviesModel.create(body);
            if(added){
                console.log("successfully added the Movie")
            }
            else{
                console.log("we Think something has gone wrong")
            }
        // }
    }
    catch(err){
        console.log("This is the err: ", err);
    }
}
//get Editing Movie

const getEditMovie = async(req,res) => {
    try{
        const myId = req.query.id;
        const findId= await movies.moviesModel.findOne({_id:myId});
        
        if(findId){
           
            res.send(findId)
        }
        else{
            console.log("Believe And Try Harder")
            res.json({message:"Try HaRDER In sha Allah"})
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}
// Editing the MOvie

const editing = async(req,res) => {
    try{
        const myId = req.params.id;
        const findId= await movies.moviesModel.findOne({_id:myId});
        const {image, name} = req.body;
        // console.log("this is the req Body:- MyDATA: ", myData);
        if(findId){
            const updated = await movies.moviesModel.findOneAndUpdate({_id:myId}, {$set:{image:image, name:name}});
            if(updated){
                console.log("Successfully Changed")
                res.send(updated)
            }
           else{
            console.log("BE Patient")
            res.send({message:"Al MUTAKABIR"})
           }
        }
        else{
            console.log("ID is Not Found")
            res.json({message:"Are You Deliberate"})
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}
export default {loadAll, searching,addMovie, deleteMovie, getEditMovie, editing};